import { Injectable, Logger } from '@nestjs/common';
import { UserManagementService } from '../user_management/user_management.service' 
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { BotSettings } from './schemas/bot-settings.schema';

const TelegramBot = require('node-telegram-bot-api');
const axios = require("axios");

@Injectable()
export class TelegramService {
	private bot:any
	private logger = new Logger(TelegramService.name)
	private TELEGRAM_TOKEN: string;
	constructor(
		@InjectModel(BotSettings.name)
    private botSettingsModel: mongoose.Model<BotSettings>,
    private readonly userManagementService: UserManagementService
	){
		this.initializeTelegramBot();
	}

	async initializeTelegramBot() {
		this.TELEGRAM_TOKEN = await this.getApiKey();
		this.bot = new TelegramBot(this.TELEGRAM_TOKEN, {polling: true});

		const conversationState = {};

		this.bot.onText(/\/start/, (msg) => {
			const chatId = msg.chat.id;
			this.sendMessageToUser(chatId, `Hello Welcome to weather App`)
			.then(() => {
				return this.sendMessageToUser(chatId, `Please enter your location to subscribe to daily wheather updates...`)				
			})	
			conversationState[chatId] = { stage: 0 };
			// this.bot.on('message',this.onRecievedMessage);	

			this.bot.on('message', async (msg) => {
			  const chatId = msg.chat.id;
			  const first_name = msg.chat.first_name;
			  const last_name = msg.chat.last_name;
	  		  const is_block = false;
			  const text = msg.text;
			
			  if (conversationState[chatId]) {
			    const stage = conversationState[chatId].stage;

			    if (stage === 0) {
			      // User provided the city, check for matching locations
	    	      const matchingLocations = await this.findLocationsForCity(text, chatId);

			      if (matchingLocations.length > 1) {
			        // If there are multiple matches, ask for the state
			        conversationState[chatId].city = text;
			        conversationState[chatId].stage = 1;
			        let msg = `I found multiple matching locations. Please enter your state:`
	  				msg = msg + "\n";

					for (let i = 1; i < matchingLocations.length; i++) {
					  const location = matchingLocations[i];
					  msg += `${i}. ${location.state}\n`;
					}
			        this.bot.sendMessage(chatId, msg);
			      } else if (matchingLocations.length === 1) {
			        // If there's only one match, complete the conversation
			        conversationState[chatId].city = text;
			        const location = text;
			        const lat = matchingLocations.lat
			        const lon = matchingLocations.lon
			        this.bot.sendMessage(chatId, `Thank you! You entered:\nCity: ${conversationState[chatId].city}`);
			  		await this.saveUserData(chatId, first_name, last_name, location, lat, lon, is_block)
			        // Clear the conversation state
			        delete conversationState[chatId];
			      } else {
			        // No matching locations found
			        this.bot.sendMessage(chatId, 'Sorry, I couldn\'t find a matching location. Please try again.');
			      }
			    } else if (stage === 1) {
			      // User provided the state, complete the conversation
			      const matchingLocations = await this.findLocationsForCity(conversationState[chatId].city, chatId);	
			      const filteredlocation = matchingLocations.find(location => location.state === text);
			      console.log(filteredlocation)
			      if (!filteredlocation) {
			      	  console.log(`No matching location found for state: ${text}`);
					} 

				  const location = filteredlocation.name;
				  const lat = filteredlocation.lat;
				  const lon = filteredlocation.lon;
				  console.log(`Latitude: ${typeof(lat)}, Longitude: ${typeof(lon)}`);	
			      this.bot.sendMessage(chatId, `Thank you! You entered:\nCity: ${conversationState[chatId].city}\nState: ${conversationState[chatId].state}`);
		  		  await this.saveUserData(chatId, first_name, last_name, location, lat, lon, is_block)

			      // Clear the conversation state
			      delete conversationState[chatId];
			    }
			  }

			});
		});
	}

	findLocationsForCity = async (msg:any, chatId:any) =>{		

  		try{
  			const response = await axios.get(
  				`https://api.openweathermap.org/geo/1.0/direct?q=${msg}&limit=0&appid=26188f35379694d2b3dfe31f701c9ef2`
  			)
  			return response.data

		}catch (error) {
		    return this.bot.sendMessage(chatId, "City doesn't exist.");
	  	}
	}

	async saveUserData(
	    user_id: string,
	    first_name: string,
	    last_name: string,
	    location: string,
	    latitude: string,
	    longitude: string,
	    is_block: boolean,
	  ): Promise<void> {
	    await this.userManagementService.saveUser(user_id, first_name, last_name, location, latitude, longitude, is_block);
	  }

	sendMessageToUser = (userId:string, message:string)=> {
		return this.bot.sendMessage(userId, message);
	}

	async updateToken(
		newToken: string
	): Promise<BotSettings> {
		const updatedBotSettings = await this.botSettingsModel.findOneAndUpdate({}, { botApiKey: newToken }, { new: true, upsert: true });
      	return updatedBotSettings;
  	}

  	async getApiKey(): Promise<string> {
	    const botSettings = await this.botSettingsModel.findOne().exec();
	    if (botSettings) {
	    	return botSettings.botApiKey;
	    }
	    return ''; // You can provide a default value or handle the case where the API key is not found.
	  }
}
