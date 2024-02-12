export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin
export GOPATH=$HOME/go
export GOROOT=/usr/local/go

go install github.com/a-h/templ/cmd/templ@latest
templ generate