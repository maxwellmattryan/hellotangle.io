import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Message } from './message.entity';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
  imports: [
      TypeOrmModule.forFeature([Message])
  ],
  exports: [
      MessageService
  ],
  controllers: [
      MessageController
  ],
  providers: [
      MessageService
  ]
})
export class MessageModule { }
