import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import cookieParser from 'cookie-parser'
import * as YAML from 'yamljs'
import * as swaggerUi from 'swagger-ui-express'
import { join } from 'path'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.use(cookieParser())

	const swaggerDocument = YAML.load(join(process.cwd(), 'swagger.yaml'))
	app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

	app.enableCors({
		origin: process.env.CLIENT_URL,
		credentials: true,
		exposedHeaders: 'set-cookie'
	})
	await app.listen(5000)
	console.log(`Swagger docs → http://localhost:5000/docs`)
}
bootstrap()
