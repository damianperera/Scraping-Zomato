//Including  both request and cheerio libraries
var request = require('request');
var cheerio = require('cheerio');
var jsonfile = require('jsonfile')
var file = 'C:\\Users\\vasinpramu\\Documents\\GitHub\\Scraping-Zomato\\src\\resdata.json'
curl = 'https://www.zomato.com/hyderabad/restaurants?page=';
restaurantsData = []
var currentPage = 1
scrapeURL(curl + currentPage)

function scrapeURL(url){
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
        json["page"] = currentPage
        $(this).find($('.search-page-text .clearfix')).each(function(ind, elem){
          json[$(this).find('.col-s-5').text().trim()] = $(this).find('.col-s-11').text().trim()
        })
        console.log(json)
        restaurantsData.push(json)
      })
      console.log("done scraping page " + currentPage)
      currentPage = currentPage + 1

      if(currentPage< 160){
        scrapeURL(curl + currentPage)
      }if(currentPage == 160){
        console.log("writing json to a file named resdata.json")
        jsonfile.writeFileSync(file, restaurantsData)
      }
    }
  })
}
