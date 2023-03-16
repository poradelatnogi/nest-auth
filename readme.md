# nest-auth

Authentication codebase for NestJS application.

## Before Installation

Install @nestjs/jwt module.
```bash
npm install --save @nestjs/jwt
```

Install @nestjs-modules/mailer module
```bash
yarn add @nestjs-modules/mailer nodemailer
#or
npm install --save @nestjs-modules/mailer nodemailer
```
Hint: handlebars, pug and ejs is an optional dependency, if you want to use the template, you must install it.

with npm
```bash
npm install --save handlebars
#or
npm install --save pug
#or
npm install --save ejs
```
with yarn
```bash
yarn add handlebars
#or
yarn add pug
#or
yarn add ejs
```

### Preparing mailer configuration:
Import the MailerModule into the root AppModule.
```ts
import { MailerModule } from '@nestjs-modules/mailer';
// In this case, we using HandlebarsAdapter, but you can change it to different.
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
// import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
// import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

// ...

@Module({
  imports: [
    // ...
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: 'smtps://user@domain.com:pass@smtp.domain.com',
        defaults: {
          from: '"nest-modules" <modules@nestjs.com>',
        },
        template: {
          dir: __dirname + '/templates',
          // In this case, we using HandlebarsAdapter, but you can change it to different.
          adapter: new HandlebarsAdapter(),
          // adapter: new PugAdapter(),
          // adapter: new EjsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    // ...
  ]
})
export class AppModule {}
```

Create email templates folder.
```bash
mkdir -p ./src/templates/emails
# go to folder
cd ./src/templates/emails
# create template file
touch reset-password.hbs
# touch reset-password.ejs
# touch reset-password.pug
```
Inside the template, user variable is available for you.

### Preparing database configuration:

Install and prepare @nestjs/typeorm module. In my case, I'm using postgresql. If you use mysql replace mysql2 instead of pg.
```bash
npm install --save @nestjs/typeorm typeorm pg
```

Update app.module.ts file. 
```bash
import * as path from 'path';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// ...

@Module({
  imports: [
    // ...
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      synchronize: true,
      logging: true,
      logger: 'file',
      entities: [path.join(__dirname, '**/*.entity{.ts,.js}')],
      migrations: [`${__dirname}/../migrations/**/*{.ts,.js}`],
    }),
    // ...
  ],
  // ...
})
export class AppModule {}
```
In this example I'm also using ConfigModule. Install @nestjs/config dependency if it isn't installed.
```bash
npm install --save @nestjs/config
```

## Installation

Install nest-auth with npm or yarn

```bash
npm install poradelatnogi/nest-auth
# or
yarn add poradelatnogi/nest-auth
```

Generate auth module, controller and service if them aren't exists
```bash
nest g mo auth
nest g co auth
nest g s auth
```

Generate user module if it isn't exists. 
```bash
nest g mo user
```

Create or update your user.entity.ts file.
```bash
# Create file

# Go to module
cd ./src/user
# Create file if it isn't exists
touch user.entity.ts
```
```ts
import { NestAuth } from "nest-auth"
import { Entity } from 'typeorm';

// ...

@Entity('user')
export class User extends NestAuth {
  // ...
}
```

Update your auth.service.ts file.
```ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NestAuthTypeOrmService } from 'nest-auth';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService extends NestAuthTypeOrmService {
  constructor(
    @InjectRepository(User)
    userRepository: Repository<User>,
    jwtService: JwtService,
    mailerService: MailerService,
  ) {
    super(userRepository, jwtService, mailerService)
  }
}
```

Update your auth.controller.ts file.
```bash
import { NestAuthController } from 'nest-auth';
import { AuthService } from './auth.service';

export class AuthController extends NestAuthController {
  constructor(authService: AuthService) {
    super(authService);
  }
}
```
Update your auth.module.ts file.
```ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategyProvider, JwtStrategyProvider, MicrosoftStrategyProvider } from 'nest-auth';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: +process.env.JWT_LIFETIME,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    // Required provider
    JwtStrategyProvider.provide({
      secretOrKey: process.env.JWT_SECRET,
    }),
    // Optional provider
    GoogleStrategyProvider.provide({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    }),
    // Optional provider
    MicrosoftStrategyProvider.provide({
      clientID: process.env.MICROSOFT_CLIENT_ID,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
      tenant: process.env.MICROSOFT_TENANTID,
    }),
  ]
})
export class AuthModule {}

```
