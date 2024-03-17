// creo los path absolutos para que no haya problemas con el path de los archivos estáticos
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default __dirname;
