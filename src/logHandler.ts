"use strict";

import { EventEmitter } from "events";
import { EventHandler } from "./models/EventHandler";
import { requestContext } from "@neylion/request-context";
import { LogData } from "./models/LogData";
import deepFreeze from "deep-freeze";

let initialized = false;
let eventHandler: EventHandler;
function init(delegates: (() => void)[], eventEmitter?: EventEmitter) {
  eventHandler = new EventHandler(delegates, eventEmitter);
  initialized = true;
}
function reset() {
  initialized = false;
}

function create(direction?: string) {
  const setupLogMethod = (level: string) => {
    return async function emitLogEvent(message: string, error?: object, logDetails?: object) {
      if (!initialized) {
        // tslint:disable-next-line: no-console
        console.error("ERROR - Logger package not initiated, please call the init method before attempting to log.");
      }
      if (requestContext.skipLogging) return;
      const logData = new LogData(level, message, direction, error, logDetails);
      eventHandler.emitLogEvent(deepFreeze(logData));
    };
  };

  return {
    fatal: setupLogMethod("fatal"),
    error: setupLogMethod("error"),
    warn: setupLogMethod("warn"),
    info: setupLogMethod("info"),
    debug: setupLogMethod("debug"),
  };
}

const log = create();
const logInbound = create("INBOUND");
const logOutbound = create("OUTBOUND");

export { init, log, logInbound, logOutbound, reset };
