import { Controller, Get, Post, Req, Body, Header, Param} from '@nestjs/common';
import { Response } from 'express';
import { IAccount } from '../interface/account.interface'
@Controller('/account')
export class AccountController {
    @Get()
    async findAll(): Promise<IAccount[]>{
      const accounts = [
        {
            username: 'admin',
            password: '123',
            name: 'Thanh Tho'
        },
        {
            username: 'user1',
            password: '123',
            name: 'Ngoc Hien'
        },
        {
            username: 'user2',
            password: '123',
            name: 'Thanh Thao'
        }
    ]
      return accounts
    }
}
