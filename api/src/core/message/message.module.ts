import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IotaModule } from '@api/core/iota/iota.module';

import { Message } from './message.entity';
import { MessageService } from './message.service';

@Module({
  imports: [
      TypeOrmModule.forFeature([Message]),

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
