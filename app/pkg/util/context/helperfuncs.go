package utilContext

import (
	"bytes"
	"fmt"
	"io"
	"log"
	"os"
	"runtime"
	"strconv"
)

func (c defaultContext) Get(key string) interface{} {
	return c.Data[key]
}

func DefaultContextProvider(appName string, out io.Writer) ContextProvider {
	return func(userID string, clientSystem string, interfce string, ids ...string) Context {
		return newContext(out, userID, clientSystem, interfce, ids...)
	}
}

func newContext(out io.Writer, userID string, clientSystem string, interfce string, ids ...string) Context {
	var w io.Writer

	if out == nil {
		w = os.Stdout
	} else {
		w = out
	}

	defaultLogLevel := "DEBUG"
	debugLog := log.New(w, "", StandardLogFlags)
	infoLog := log.New(w, "", StandardLogFlags)
	errorLog := log.New(w, "", StandardLogFlags|log.Lshortfile)

	ctx := &defaultContext{Ids: ids, PrimaryID: ids[0], UserIDValue: userID, ClientSystemValue: clientSystem, Interfce: interfce, logLevel: defaultLogLevel, DebugLog: debugLog, InfoLog: infoLog, ErrorLog: errorLog, Data: make(map[string]interface{}), W: nil}

	// Assume the user is a system user by default
	ctx.IsSystemUserValue = true

	return ctx
}

func (c defaultContext) shouldLog(logLevel string) bool {
	// If debug then log everything
	if c.logLevel == logDebugLevelPrefix {
		return true
	}

	// If info, then log everything except debug
	if c.logLevel == logInfoLevelPrefix && logLevel != logDebugLevelPrefix {
		return true
	}

	// If error, we always log errors...always
	if logLevel == LogErrorLevelPrefix {
		return true
	}

	return false
}

func (c *defaultContext) FormatMsg(level string, msg string) string {

	if c.UserIDValue == noUser {
		return fmt.Sprintf(logMsgFormatNoUser, level, c.IDs(), msg)
	} else {
		return fmt.Sprintf(logMsgFormat, c.UserIDValue, level, c.IDs(), msg)
	}

}

func (c defaultContext) IDs() string {
	var buf bytes.Buffer

	for _, id := range c.Ids {
		buf.WriteString(id)
		buf.WriteString(" ")
	}

	return buf.String()
}

func StackTrace() string {
	var buf bytes.Buffer
	ok := true
	var file string
	var line int
	stack := 2

	buf.WriteString("\n\n\t[STACK TRACE]")

	for ok {
		_, file, line, ok = runtime.Caller(stack)

		if ok {
			buf.WriteString("\n\t")
			buf.WriteString("[")
			buf.WriteString(strconv.Itoa(stack))
			buf.WriteString("] ")
			buf.WriteString(file)
			buf.WriteString(":")
			buf.WriteString(strconv.Itoa(line))

		} else {
			buf.WriteString("\n\n")
		}

		stack++
	}

	return buf.String()
}
