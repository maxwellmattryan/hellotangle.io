import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IotaModule } from '@api/iota/iota.module';

import { Message } from '@api/message/entities/message.entity';
import { MessageController } from './controllers/message.controller';
import { MessageRepository } from './repositories/message.repository';
import { MessageService } from './services/message.service';

@Module({
    imports: [
        IotaModule,
        TypeOrmModule.forFeature([Message, MessageRepository])
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
