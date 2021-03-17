import express, { Application, NextFunction, Response, Router } from "express";
import { Server as HTTPServer } from "http";
import { traverseDirectory } from "./Utils";
import bodyParser from "body-parser";
import { createProxyMiddleware } from "http-proxy-middleware";
export type ServerOptions = {
	port: number;
};

export class Server {
	private app: Application;
	private http: HTTPServer;
	private options: ServerOptions;
	private routes: Router[];

	constructor(opts: ServerOptions = { port: 8080 }) {
		this.options = opts;

		this.app = express();
	}

	async start() {
		// recursively loads files in routes/
		this.app.use(bodyParser.json());
		this.routes = await this.registerRoutes(__dirname + "/routes/");
		// @ts-ignore
		this.app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
			res.status(400).json({ success: false, error: err && err.toString(), code: 400 });
		});
		var proxy = createProxyMiddleware({ target: "http://localhost:3000" });
		this.app.use("*", (req, res, next) => {
			return proxy(req, res, next);
		});

		await new Promise<void>((res) => this.app.listen(this.options.port, () => res()));
		console.log(`[Server] started on ${this.options.port}`);
	}

	async registerRoutes(root: string) {
		return await traverseDirectory({ dirname: root, recursive: true }, this.registerRoute.bind(this, root));
	}

	registerRoute(root: string, file: string): any {
		if (root.endsWith("/") || root.endsWith("\\")) root = root.slice(0, -1); // removes slash at the end of the root dir
		let path = file.replace(root, ""); // remove root from path and
		path = path.split(".").slice(0, -1).join("."); // trancate .js/.ts file extension of path
		if (path.endsWith("index")) path = path.slice(0, "/index".length * -1); // delete index from path

		try {
			var router = require(file);
			if (router.router) router = router.router;
			if (router.default) router = router.default;
			if (!router || router.prototype.constructor.name !== "router")
				throw `File doesn't export any default router`;
			this.app.use(path, <Router>router);
			console.log(`[Server] Route ${path} registerd`);
			return router;
		} catch (error) {
			console.error(new Error(`[Server] Failed to register route ${file}: ${error}`));
		}
	}

	async stop() {
		return new Promise<void>((res) => this.http.close(() => res()));
	}
}
