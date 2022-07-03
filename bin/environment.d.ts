import { Args } from "./utilities/args";

declare global {
  namespace NodeJS {
    type ProcessEnv = Args;
  }
}
