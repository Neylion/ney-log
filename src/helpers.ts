"use strict";

export function getTimeStamp() {
  const timestamp = Date.now();
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const milliseconds = date.getMilliseconds().toString().padStart(3, "0");
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

export function getElapsedTime(startTime: Date) {
  if (!startTime) return undefined;
  const endTime = Date.now();
  const elapsedTime = endTime - startTime.getTime();
  return elapsedTime / 1000;
}
