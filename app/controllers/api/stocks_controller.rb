require 'net/http'
require 'json'

class Api::StocksController < ApplicationController
    BASE_URL = "https://financialmodelingprep.com/api/v3"
    API_KEY = ""  


    # def quote 
    #       symbol = params[:symbol]
    #       IEX::Api.configure do |config|
    #         config.publishable_token = 'pk_a97bf10f146749bf9d64c36ba6ee72c6' # defaults to ENV['IEX_API_PUBLISHABLE_TOKEN']       
    #         config.secret_token = 'sk_fdb0342d026443a28057ef26a4c60a23' # defaults to ENV['IEX_API_PUBLISHABLE_TOKEN']       
    #       end
    #       client = IEX::Api::Client.new(
    #       publishable_token: 'pk_a97bf10f146749bf9d64c36ba6ee72c6',
    #       secret_token: 'sk_fdb0342d026443a28057ef26a4c60a23',
    #       endpoint: 'https://cloud.iexapis.com/v1'
    #         )
    #       result = client.quote(symbol)
    #       render :json => result

    # end
    def quote
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

    # def chart 
    #       symbol = params[:symbol]
    #       client = IEX::Api::Client.new(
    #       publishable_token: 'pk_a97bf10f146749bf9d64c36ba6ee72c6',
    #       secret_token: 'sk_fdb0342d026443a28057ef26a4c60a23',
    #       endpoint: 'https://cloud.iexapis.com/v1'
    #         )
    #       # result = client.chart(symbol, "5d")
    #       # result = client.chart(symbol, "3m")
    #       result = client.chart(symbol, "1d")
    #       render :json => result

    # end

    private

  def fetch_data(url)
    uri = URI(url)
    response = Net::HTTP.get(uri)
    JSON.parse(response)
  rescue StandardError => e
    { error: "Failed to fetch data", details: e.message }
  end


end
