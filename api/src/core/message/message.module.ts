import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IotaModule } from '@api/core/iota/iota.module';

import { MessageService } from './message.service';
import { MessageRepository } from '@api/core/message/message.repository';

@Module({
  imports: [
      TypeOrmModule.forFeature([MessageRepository]),

      IotaModule
  ],
  exports: [
      MessageService
  ],
  controllers: [],
  providers: [
      MessageService
  ]
})
export class MessageModule { }
