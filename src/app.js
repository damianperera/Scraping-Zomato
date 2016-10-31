//Including  both request and cheerio libraries
var request = require('request');
var cheerio = require('cheerio')
url = 'https://www.zomato.com/hyderabad/restaurants';

request(url, function(error, response, html){
  if(!error){
    var $ = cheerio.load(html);
    var content = $('.content .js-search-result-li')
    content.each(function(index,element){
      var rating = $(this).find($('.rating-popup')).text().trim()
      var restaurant = $(this).find($('.result-title')).text().trim()
      var durl = $(this).find($('.result-title')).attr('href');
      var place = $(this).find($('b')).text().trim()
      var type = $(this).find($('.fontsize6')).text().trim()
      var noOfVotes = $(this).find($('.ta-right')).find($("span")).text().trim()
      var noOfReviews = $(this).find($('.ta-right')).find($("a")).text().trim()
      var json = {}
      json["name"] = restaurant
      json["place"] = place
      json["type"] = type
      json["rating"] = rating
      json["votes"] = noOfVotes
      json["noOfReviews"] = noOfReviews
      json["url"] = durl
      console.log("name : " + restaurant )
      console.log("place : " + place)
      console.log("type : " + type)
      console.log("rating : " + rating)
      console.log("votes : " + noOfVotes)
      console.log("noOfReviews : " + noOfReviews)
      $(this).find($('.search-page-text .clearfix')).each(function(ind, elem){
        json[$(this).find('.col-s-5').text().trim()] = $(this).find('.col-s-11').text().trim()
        console.log($(this).find('.col-s-5').text().trim() + $(this).find('.col-s-11').text().trim())
      })
      console.log(json)
      console.log("----------------------------------------------")
    })
  }
})
