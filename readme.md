# nest-auth

Authentication module based on NestJS. Included auth controller, services etc. This module provides auth api endpoints.

### API endpoints

| Method | Route                    | DTO                                                                               |
|--------|--------------------------|-----------------------------------------------------------------------------------|
| POST   | /auth/sign-in            | ``` { email: string, password: string } ```                                       |
| POST   | /auth/sign-up            | ``` { email: string, password: string, firstName: string, lastName?: string } ``` |
| POST   | /auth/password/reset     | ``` { email: string } ```                                                         |
| POST   | /auth/password/new       | ``` { resetPasswordToken: string, password: string } ```                          |
| GET    | /auth/google             | ``` none ```                                                                      |
| GET    | /auth/google/callback    | ``` none ```                                                                      |
| GET    | /auth/microsoft          | ``` none ```                                                                      |
| GET    | /auth/microsoft/callback | ``` none ```                                                                      |

## Before installation:

First, install and configure ```@nestjs/typeorm``` module.

```bash
# In my case, I am using postgresql. If you plan use mysql, for example.
# You should replace mysql2 instead of pg
npm install --save @nestjs/typeorm typeorm pg
# or
yarn add @nestjs/typeorm typeorm pg

# I also using nestjs/config module in example below
npm install --save @nestjs/config
#or 
yarn add @nestjs/config
```

Import ```TypeOrmModule``` into the root ```AppModule```: 

```ts
import * as path from 'path';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Some code here

@Module({
  imports: [
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
    // Other imports
  ],
  // Providers, exports etc.
})

export class AppModule {}
```

Next, install ```@nestjs/jwt``` module.

```bash
npm install --save @nestjs/jwt
#or 
yarn add @nestjs/jwt
```

Than, install ```@nestjs-modules/mailer``` module.
```bash
yarn add @nestjs-modules/mailer nodemailer
yarn add -D @types/nodemailer
#or
npm install --save @nestjs-modules/mailer nodemailer
npm install --save-dev @types/nodemailer
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

## Installation

Install ```nest-auth``` module.

```bash
npm install poradelatnogi/nest-auth
# or
yarn add poradelatnogi/nest-auth
```

Generate auth's module, controller and service if them aren't exists.

```bash
nest g mo auth
nest g co auth
nest g s auth
```

Generate user module if it isn't exists. 

```bash
nest g mo user
```

Create or update your ```user.entity.ts``` file.

```bash
# Create user.entity.ts file

# Go to the user module
cd ./src/user
# Create file
touch user.entity.ts
# Back to the root folder
cd ../../
```

Update your ```user.entity.ts``` file.
```ts
import { NestAuth } from 'nest-auth';
import { Entity } from 'typeorm';

@Entity('user')
export class User extends NestAuth {
  // Other properties
}
```

Update your ```auth.service.ts``` file.
```ts
import { Injectable } from '@nestjs/common';
import { NestAuthTypeOrmService, NestAuthMailService } from 'nest-auth';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService extends NestAuthTypeOrmService {
  constructor(
    @InjectRepository(User)
    userRepository: Repository<User>,
    jwtService: JwtService,
    nestAuthMailerService: NestAuthMailService,
  ) {
    super(userRepository, jwtService, nestAuthMailerService);
  }
  // Other methods
}
```

Update your ```auth.controller.ts``` file.

```ts
import { Controller } from '@nestjs/common';
import { NestAuthController } from 'nest-auth';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController extends NestAuthController {
  constructor(authService: AuthService) {
    super(authService);
  }
  // Other methods
}
```

Update your ```auth.module.ts``` file.
```ts
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {
  GoogleStrategyProvider,
  JwtStrategyProvider,
  NestAuth,
  NestAuthModule,
} from 'nest-auth';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    // import User entity
    TypeOrmModule.forFeature([User]),
    // import JwtModule
    // detail config https://www.npmjs.com/package/@nestjs/jwt
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: +process.env.JWT_LIFETIME,
      },
    }),
    // Import NestAuthModule
    NestAuthModule.register({
      // mailerOptions supports the same config as https://www.npmjs.com/package/@nestjs-modules/mailer
      mailerOptions: {
        transport: {
          host: process.env.MAIL_HOST,
          secure: process.env.MAIL_SECURE === 'true',
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
          },
          defaults: {
            from:
              '"' + process.env.APP_NAME + '" <' + process.env.MAIL_FROM + '>',
          },
          template: {
            dir: join(__dirname, 'templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        },
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
  ],
})
export class AuthModule {}
```

You also need to create template file for reset password feature.
Create email templates folder. In my case, I created it inside ```src/auth``` folder. According to my configuration above.

```bash
mkdir -p ./src/user/templates/emails
# go to folder
cd ./src/user/templates/emails
# create template file
touch reset-password.hbs
# touch reset-password.ejs
# touch reset-password.pug
# Back to the root folder
cd ../../../../
```
Inside the template, ```user``` variable is available for you.

### .ENV Example
```dotenv
APP_NAME=YOUR_APP_NAME
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_PASSWORD=
POSTGRES_USER=root
POSTGRES_DB=YOUR_DB_NAME
JWT_SECRET=YOUR_SECRET_KEY
JWT_LIFETIME=YOUR_JWT_LIFETIME
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_SECRET=YOUR_GOOGLE_SECRET_KEY
GOOGLE_CALLBACK_URL=YOUR_GOOGLE_CALLBACK_URL
MICROSOFT_CLIENT_ID=YOUR_MICROSOFT_CLIENT_ID
MICROSOFT_CLIENT_SECRET=YOUR_MICROSOFT_CLIENT_SECRET
MICROSOFT_CALLBACK_URL=YOUR_MICROSOFT_CLIENT_CALLBACK
MICROSOFT_TENANTID=YOUR_MICROSOFT_TENANTID
MAIL_HOST=smtp.example.com
MAIL_USER=user@example.com
MAIL_PASSWORD=
MAIL_FROM=user@example.com
MAIL_SECURE=true
```
