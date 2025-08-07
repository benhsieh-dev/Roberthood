require 'net/http'

class Api::NewsController < ApplicationController

  def new
    url = URI.parse("http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=#{ENV['NEWS_API_KEY']}")
    req = Net::HTTP::Get.new(url.to_s)
    res = Net::HTTP.start(url.host, url.port) {|http|
      http.request(req)
    }
    render :json => res.body 
  end

end

