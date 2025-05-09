require 'net/http'
require 'json'

class Api::StocksController < ApplicationController
    BASE_URL = "https://financialmodelingprep.com/api/v3"
    API_KEY = ENV['FINANCIAL_MODELING_API_KEY'] 

    def quote
      binding.pry
      symbol = params[:symbol]
      url = "#{BASE_URL}/quote/#{symbol}?apikey=#{API_KEY}"
      
      response = fetch_data(url)
      render json: response
    end

    def chart
      symbol = params[:symbol]
      url = "#{BASE_URL}/historical-chart/5min/#{symbol}?apikey=#{API_KEY}" # 5-min intervals
      
      response = fetch_data(url)
      render json: response
    end

    private

  def fetch_data(url)
    uri = URI(url)
    response = Net::HTTP.get(uri)
    JSON.parse(response)
  rescue StandardError => e
    { error: "Failed to fetch data", details: e.message }
  end


end
