import { Controller, Get, Post, Put, Body, Param, Res, Delete, UseGuards, HttpCode, HttpException, HttpStatus } from '@nestjs/common';
import { CreateEventRequestDto } from './Dtos/create-event.request';
import { EventsService } from './events.Service';
import { UpdateEventRequestDto } from './Dtos/update-event.request';
import { ApiParam } from '@nestjs/swagger';
import { getEventsByUserId } from './Dtos/get-events-by-uid.request';
import { GetEventById } from './Dtos/get-event-by-id.request';
import { DeleteEventByIdDto } from './Dtos/delete-event-by-id.request';
import { FirebaseAuthGuard } from 'src/auth/firebase/firebase-auth.guard';

@Controller('events')
export class EventsController { 
    constructor(private readonly eventsService: EventsService) {}

    @Post('createNew')
    @UseGuards(FirebaseAuthGuard)
    @HttpCode(204)
    async create(@Body() request: CreateEventRequestDto): Promise<any>{
        try{
            var result = await this.eventsService.createEvent(request)
            return result;

        } catch(error: any) {
            if(error === 'Date already picked'){
                throw new HttpException('Date already picked', HttpStatus.BAD_REQUEST);
            }
            throw new HttpException('Server error: ' + error, HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    @Put('updateEvent')
    @UseGuards(FirebaseAuthGuard)
    @HttpCode(204)
    async update(@Body() request: UpdateEventRequestDto): Promise<any>{
        try{
            var result = await this.eventsService.updateEvent(request);
            return result;

        }catch(error: any) {

            if(error === 'Wrong id'){
                throw new HttpException('Wrong event id', HttpStatus.BAD_REQUEST);
            }
            else if(error === 'Unavailable date'){
                throw new HttpException('Unavailable date', HttpStatus.BAD_REQUEST);
            }

            throw new HttpException('Server error: ' + error, HttpStatus.SERVICE_UNAVAILABLE);

        }
    }

    @Get('getEventsByUserId/:userId')
    @UseGuards(FirebaseAuthGuard)
    @HttpCode(204)
    @ApiParam({ name: 'userId', description: 'User ID', type: String })
    async getByUserId(@Param() request: getEventsByUserId): Promise<any>{
        try {
            var result = await this.eventsService.getEventsByUserId(request.userId);
            return result;
        }catch(error: any) {
            throw new HttpException('Server error: ' + error, HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    @Get('getEventsById/:eventId')
    @UseGuards(FirebaseAuthGuard)
    @HttpCode(204)
    @ApiParam({ name: 'eventId', description: 'Event ID', type: String })
    async getByEventId(@Param() request: GetEventById): Promise<any>{
        try {
            var result = await this.eventsService.getEventById(request.eventId);
            return result;
        }catch(error: any) {
            throw new HttpException('Server error: ' + error, HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    @Delete('deleteEventById')
    @UseGuards(FirebaseAuthGuard)
    @HttpCode(204)
    async deleteEventById(@Body() request: DeleteEventByIdDto): Promise<any>{
        try {
            await this.eventsService.deleteEventById(request.eventId)
            return;
        }catch(error: any) {
            throw new HttpException('Server error: ' + error, HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

}