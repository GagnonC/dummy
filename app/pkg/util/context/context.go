package utilContext

import (
	"fmt"
	"io"
	"log"
)

const (
	noUser                     = "none"
	logMsgFormatNoUser         = "level:%v\t context:[%v] \033[1;33m%v\033[0m"
	logMsgFormat               = "user:%v\t " + logMsgFormatNoUser
	logDebugLevelPrefix string = "DEBUG"
	logInfoLevelPrefix  string = "INFO"
	LogErrorLevelPrefix string = "ERROR"
	StandardLogFlags           = log.Ltime | log.Ldate | log.Lmicroseconds
)

var (
	errorHandlers = make(map[string]ErrorHandler)
)

type Context interface {
	SetLogLevel(logLevel string)
	DebugF(format string, v ...interface{})
	InfoF(format string, v ...interface{})
	ErrorF(format string, v ...interface{})
	IDs() string
}

type ContextProvider func(userID string, clientSystem string, interfce string, ids ...string) Context

type ErrorHandler func(ctx Context, errorMessage string)

type defaultContext struct {
	Data              map[string]interface{}
	Ids               []string
	PrimaryID         string
	logLevel          string
	DebugLog          *log.Logger
	InfoLog           *log.Logger
	ErrorLog          *log.Logger
	W                 io.Writer
	HasErrorValue     bool
	UserIDValue       string
	IsSystemUserValue bool
	ClientSystemValue string
	Interfce          string
	ShouldRealert     bool
}

func (c *defaultContext) SetLogLevel(logLevel string) {
	c.logLevel = logLevel
}

func (c defaultContext) DebugF(format string, v ...interface{}) {
	if c.shouldLog(logDebugLevelPrefix) {
		msg := fmt.Sprintf(format, v...)

		c.DebugLog.Printf(c.FormatMsg(logDebugLevelPrefix, msg))
	}
}

func (c defaultContext) InfoF(format string, v ...interface{}) {
	if c.shouldLog(logInfoLevelPrefix) {
		msg := fmt.Sprintf(format, v...)

		c.DebugLog.Printf(c.FormatMsg(logInfoLevelPrefix, msg))
	}
}

func (c *defaultContext) ErrorF(format string, v ...interface{}) {
	c.HasErrorValue = true
	msg := fmt.Sprintf(format, v...)
	if c.shouldLog(LogErrorLevelPrefix) {
		c.ErrorLog.Printf(c.FormatMsg(LogErrorLevelPrefix, StackTrace()))
		c.DebugLog.Printf(c.FormatMsg(LogErrorLevelPrefix, msg))
	}
	for _, eh := range errorHandlers {
		eh(c, msg)
	}
}
