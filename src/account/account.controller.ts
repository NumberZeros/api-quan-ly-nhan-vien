import { Controller, Get, Post, Req, Body, Header, Param} from '@nestjs/common';
import { Request } from 'express';

@Controller('/account')
export class AccountController {
    @Get('/:id')
    @Header('Cache-Control', 'none')
    findAll(@Req() request: Request, @Body() body: Body, @Param() param): Object {
        // console.log("req",request);
        console.log("body",body)
        console.log("Params",param)
      return {};
    }

  @Post()
  create(): string {
    return 'This action adds a new cat';
  }
}
