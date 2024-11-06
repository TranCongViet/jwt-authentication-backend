import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { JwtAuthMiddleware } from './middleware/jwt-auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST, 
      port: parseInt(process.env.DATABASE_PORT, 10), 
      username: process.env.DATABASE_USERNAME, 
      password: process.env.DATABASE_PASSWORD, 
      database: process.env.DATABASE_NAME, 
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, 
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtAuthMiddleware).forRoutes('profile');
  }
}
