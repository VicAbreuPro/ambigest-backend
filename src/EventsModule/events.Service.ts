import { Inject, Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { EventsRepository } from './events.Repository';
import { CreateEventRequestDto } from './Dtos/create-event.request';
import { EventsEntity } from './Entities/events.entity';
import { EventResponse } from './Dtos/event.response';
import { UpdateEventRequestDto } from './Dtos/update-event.request';

@Injectable()
export class EventsService { 
    constructor(private eventsRepository: EventsRepository){}

    async createEvent(dto: CreateEventRequestDto): Promise<EventResponse> {
        
        var startDate = new Date(dto.pickupAt);
        startDate.setMinutes(startDate.getMinutes() - 29);

        var endDate = new Date(dto.pickupAt);
        endDate.setMinutes(endDate.getMinutes() + 29);

        var closeEvents = await this.eventsRepository.getAllBetweenDates(dto.type ,startDate, endDate);

        if(closeEvents.length !== 0) throw new Error("Date already picked");

        try{
            const event: EventsEntity = {
                id: new ObjectId(),
                userId: dto.userId.toString(),
                type: dto.type,
                latitude: dto.latitude,
                longitude: dto.longitude,
                createdAt: new Date(),
                updatedAt: new Date(),
                pickupAt: new Date(dto.pickupAt)
            }

            const result = await this.eventsRepository.CreateEvent(event);

            const output : EventResponse = {
                id: result.id,
                userId: dto.userId,
                type: result.type,
                latitude: result.latitude,
                longitude: result.longitude,
                createdAt: result.createdAt,
                updatedAt: result.updatedAt,
                pickupAt: result.pickupAt
            }

            return output;
        }catch(error: any){
            throw new Error();
        }
    }

    async getEventsByUserId(userId: ObjectId): Promise<EventResponse[]> {

        try{
            const events = await this.eventsRepository.getAllByUserId(userId.toString());

            const output: EventResponse[] = events.map((element) => ({
                id: element.id,
                userId: new ObjectId(element.userId),
                type: element.type,
                latitude: element.latitude,
                longitude: element.longitude,
                createdAt: element.createdAt,
                updatedAt: element.updatedAt,
                pickupAt: element.pickupAt,
              }));
    
            return output;
        }catch(error: any){
            throw new Error();
        }
    }

    async getEventById(eventId: string): Promise<EventResponse> {
        
        try{
            const event = await this.eventsRepository.getEventById(new ObjectId(eventId));

            if(event === null) return new EventResponse()

            const output : EventResponse = {
                id: event.id,
                userId: new ObjectId(event.userId),
                type: event.type,
                latitude: event.latitude,
                longitude: event.longitude,
                createdAt: event.createdAt,
                updatedAt: event.updatedAt,
                pickupAt: event.pickupAt
            }
    
            return output;
        }catch(error: any){
            throw new Error();
        }
        
    }

    async deleteEventById(eventId: string) {
        try{
            await this.eventsRepository.DeleteEvent(new ObjectId(eventId));
            return;
        }catch(error: any){
            throw new Error();
        }
    }

    async updateEvent(model: UpdateEventRequestDto) {

        try {
            const existing = await this.eventsRepository.getEventById(new ObjectId(model.eventId));
            if(existing == null) throw new Error('Wrong id');
    
            const checker = this.CheckPickupAvailability(model.pickupAt, model.type)
            if(!checker) throw new Error("Unavailable date");
    
            existing.latitude = model.latitude;
            existing.longitude = model.longitude;
            existing.pickupAt = new Date(model.pickupAt);
            existing.type = model.type;
            existing.updatedAt = new Date();
    
            var result = await this.eventsRepository.UpdateEvent(existing);
    
            const output: EventResponse = {
                id: result.id,
                userId: new ObjectId(result.userId),
                type: result.type,
                latitude: result.latitude,
                longitude: result.longitude,
                createdAt: result.createdAt,
                updatedAt: result.updatedAt,
                pickupAt: result.pickupAt
            }
    
            return output;
        }catch(error: any){
            throw new Error();
        }
        

    }

    private async CheckPickupAvailability(date: Date, type: string): Promise<boolean>{
        var startDate = new Date(date);
        startDate.setMinutes(startDate.getMinutes() - 29);

        var endDate = new Date(date);
        endDate.setMinutes(endDate.getMinutes() + 29);

        var closeEvents = await this.eventsRepository.getAllBetweenDates(type, startDate, endDate);
        if(closeEvents === null) return true;

        return false
    }
}