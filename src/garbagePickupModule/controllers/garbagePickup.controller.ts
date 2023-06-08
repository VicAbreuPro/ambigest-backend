import { Controller, Body, Res, Get, Post } from "@nestjs/common";
import { GarbageCollectionService } from "../services/garbagePickup.service";

@Controller('users')
export class GarbageCollectionController {
    constructor(private garbageCollectionService: GarbageCollectionService) {}
    
    
}