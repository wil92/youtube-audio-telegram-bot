import {Process} from "./lib/core/process";
import {Telegram} from "./lib/telegram";

const process = new Process(new Telegram());

process.startService();
