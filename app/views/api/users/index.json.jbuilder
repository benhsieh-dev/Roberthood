
# <!DOCTYPE html>
# <html lang="en">
# <head>
#     <meta charset="UTF-8">
#     <meta name="viewport" content="width=device-width, initial-scale=1.0">
#     <title>Portfolio | Roberthood</title>
# </head>
# <body>
    
# </body>
# </html>

json.array! @users do |user|
  json.partial! 'api/users/user', user: user
end