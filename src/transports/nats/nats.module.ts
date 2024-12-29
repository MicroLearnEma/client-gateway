import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NATS_SERVICE } from './injection-token';
import { env } from 'src/config';
const clientModule = ClientsModule.register([
    {
        name: NATS_SERVICE,
        transport: Transport.NATS,
        options: {
            servers: env.nats_servers
        }
    }
])
@Module({
    imports: [clientModule],
    exports: [clientModule]
})
export class NatsModule { }
