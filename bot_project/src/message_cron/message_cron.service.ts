import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as moment from 'moment-timezone';
import * as TelegramBot from 'node-telegram-bot-api';
import { UserManagementService } from '../user_management/user_management.service'; // Import the UserManagementService or adjust the import path

const axios = require("axios");
const TELEGRAM_TOKEN = "6281480925:AAGKjFhgbEWOB9nKpVZyP7wIU3wZwP_E0GU"

@Injectable()
export class MessageCronService {
  private readonly bot:any
  constructor(private readonly userManagementService: UserManagementService) {
  	this.bot = new TelegramBot(TELEGRAM_TOKEN, { polling: false });
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async sendMessagesToUsers() {
    const users = await this.userManagementService.findAll();
    console.log('cron started')

    for (const user of users) {
      
      if (user.is_block === true) {
      	continue
      }
      const lat = user.latitude;
      const lon = user.longitude;	
      let local_timezone;
      const res = await axios.get(
      		`https://api.wheretheiss.at/v1/coordinates/${lat},${lon}`
      	)
      local_timezone = res.data.timezone_id;

	  const localTime = moment()
	    .tz(local_timezone) // Using the user's location as the timezone
	    .format('HH:mm:ss');


  	  if (localTime === '08:01:00') {
    	await this.sendMessageToUser(user);
	  }

  	console.log('cron ended')
    }
  }

  async sendMessageToUser(user) {
  	const chatId = user.user_id;
  	const location = user.location;

    try {
	    const response = await axios.get(
	      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=26188f35379694d2b3dfe31f701c9ef2`
	    );
	    const data = response.data;
	    const weather = data.weather[0].description;
	    const temperature = data.main.temp - 273.15;
	    const city = data.name;
	    const humidity = data.main.humidity;
	    const pressure = data.main.pressure;
	    const windSpeed = data.wind.speed;
	    const message = `Today's weather in ${city} is ${weather} with a temperature of ${temperature.toFixed(2)}°C. The humidity is ${humidity}%, the pressure is ${pressure}hPa, and the wind speed is ${windSpeed}m/s.`;

	    this.bot.sendMessage(chatId, message);
	  } catch (error) {
	    this.bot.sendMessage(chatId, "City doesn't exist.");
	  }
  }
}