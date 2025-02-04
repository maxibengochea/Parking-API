import { LogType } from "../types/log.type"
import { Log } from "./schemas/logs.schema"

class LogsModel {
  static async addLog(log: LogType) {
    //crear el 'log' en la base de datos
    const newLog = new Log({ ...log })
    await newLog.save()
    return 
  }
}

export default LogsModel