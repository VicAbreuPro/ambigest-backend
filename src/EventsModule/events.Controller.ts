import { Controller, Get, Post, Put, Body, Param, Res, Delete } from '@nestjs/common';
import { CreateEventRequestDto } from './Dtos/create-event.request';
import { EventsService } from './events.Service';
import { Response } from 'express'
import { UpdateEventRequestDto } from './Dtos/update-event.request';
import { ApiParam } from '@nestjs/swagger';
import { getEventsByUserId } from './Dtos/get-events-by-uid.request';
import { GetEventById } from './Dtos/get-event-by-id.request';
import { DeleteEventByIdDto } from './Dtos/delete-event-by-id.request';

@Controller('events')
export class EventsController { 
    constructor(private readonly eventsService: EventsService) {}

    @Post('createNew')
    async create(@Body() request: CreateEventRequestDto, @Res() res: Response){
        try{
            var result = await this.eventsService.createEvent(request)
            res.status(200).json(result);

        } catch(error: any) {
            res.status(400).json('Error: Error trying to create the event')
        }
    }

    @Put('updateEvent')
    async update(@Body() request: UpdateEventRequestDto, @Res() res: Response){
        try{
            var result = await this.eventsService.updateEvent(request);
            res.status(200).json(result);
        }catch(error: any) {
            res.status(400).json('Error: Error trying to update the event')
        }
    }

    @Get('getEventsByUserId/:userId')
    @ApiParam({ name: 'userId', description: 'User ID', type: String })
    async getByUserId(@Param() request: getEventsByUserId, @Res() res: Response){
        try {
            var result = await this.eventsService.getEventsByUserId(request.userId);
            res.status(200).json(result);
        }catch(error: any) {
            res.status(400).json('Error: Error trying to retrieve events');
        }
    }

    @Get('getEventsById/:eventId')
    @ApiParam({ name: 'eventId', description: 'Event ID', type: String })
    async getByEventId(@Param() request: GetEventById, @Res() res: Response){
        try {
            var result = await this.eventsService.getEventById(request.eventId);
            res.status(200).json(result);
        }catch(error: any) {
            res.status(400).json('Error: Error trying to retrieve event');
        }
    }

    @Delete('deleteEventById')
    async deleteEventById(@Body() request: DeleteEventByIdDto, @Res() res: Response){
        try {
            await this.eventsService.deleteEventById(request.eventId)
            res.status(200).json("Deleted");
        }catch(error: any) {
            res.status(400).json(error)
        }
    }

}