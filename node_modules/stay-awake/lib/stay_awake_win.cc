#include <node.h>
#include <Windows.h>

namespace stay_awake {

	using v8::FunctionCallbackInfo;
	using v8::Isolate;
	using v8::Local;
	using v8::Object;
	using v8::Number;
	using v8::Value;

	void StayAwake(const FunctionCallbackInfo<Value>& args) {
		Isolate* isolate = args.GetIsolate();
		int val = SetThreadExecutionState(ES_CONTINUOUS | ES_SYSTEM_REQUIRED | ES_DISPLAY_REQUIRED);
		Local<Number> retVal = Number::New(isolate, val);
		args.GetReturnValue().Set(retVal);
	}

	void CanSleep(const FunctionCallbackInfo<Value>& args) {
		Isolate* isolate = args.GetIsolate();
		int val = SetThreadExecutionState(ES_CONTINUOUS);
		Local<Number> retVal = Number::New(isolate, val);
		args.GetReturnValue().Set(retVal);
	}

	void GetState(const FunctionCallbackInfo<Value>& args) {
		Isolate* isolate = args.GetIsolate();
		int val = ES_CONTINUOUS | ES_SYSTEM_REQUIRED | ES_DISPLAY_REQUIRED;
		Local<Number> retVal = Number::New(isolate, val);
		args.GetReturnValue().Set(retVal);
	}

	void init(Local<Object> exports) {
		NODE_SET_METHOD(exports, "start", StayAwake);
		NODE_SET_METHOD(exports, "stop", CanSleep);
		NODE_SET_METHOD(exports, "getState", GetState);
	}

	NODE_MODULE(stay_awake, init)

}