# Use the official Node.js 14 image as the base image
FROM node:16-alpine

#Set env
ENV FIREBASE_CONFIG_API_KEY="AIzaSyADkPiN1tNqA13BmpN3pzP5l93AgtEIv1c"
ENV FIREBASE_CONFIG_APP_ID="1:84678773490:web:16f423a185b2f31df2de6b"
ENV FIREBASE_CONFIG_AUTH_DOMAIIN="ambigest-d92a3.firebaseapp.com"
ENV FIREBASE_CONFIG_AUTH_PROVIDER="https://www.googleapis.com/oauth2/v1/certs"
ENV FIREBASE_CONFIG_AUTH_URI="https://accounts.google.com/o/oauth2/auth"
ENV FIREBASE_CONFIG_CLIENT_CERTIFICATE_URL="https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-d6ys4%40ambigest-d92a3.iam.gserviceaccount.com"
ENV FIREBASE_CONFIG_CLIENT_EMAIL="firebase-adminsdk-d6ys4@ambigest-d92a3.iam.gserviceaccount.com"
ENV FIREBASE_CONFIG_CLIENT_ID="104529563637006882522"
ENV FIREBASE_CONFIG_MEASUREMENT_ID="G-Y83QYL3V7W"
ENV FIREBASE_CONFIG_MESSAGE_SENDER_ID="84678773490"
ENV FIREBASE_CONFIG_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCROZdcD9+zV07AJ/0j+i2qi8H7NkExcKA0WzKk4gvv3nDQNTVg/nTmOnCXIP9C0dhDcNsaI4JTMLYvWJ6dOl88sGF2PcEKv4nsjmwYp5nTl4kT4D++C4M7lfogwg2KFBQGmIJoe1VeTpNOzvfSS2RuuXmUk8LfCX/sx5zUKkoo7pbAJ6JH3J4Y7w4AzeFGT/JmhHKDo+pa3Am0lcoJN60Ae3quVU5eKJN6TDmeXaQcgXTn4bUjKrf+FnZR4nmBDDxCmZV3XtQWOIZrTYdAIEVW6qpSmYvDzc6AsD/S/b9kbbO+E/DIqjBsCAV+0jzFSAFXJN8XTY7RZC3e6/BIQRZ1AgMBAAECggEAI4F4HxsGb1t+Nn7QZjZpadQHljq6j7LgiExvwl492uSAoncP2On9fLh3BIwdvKF/hWWXO/nIiDxVnpfFF93IoRbijT0l8FHKD9r2VMTNWC0pZ4GhM/6ulCfj4pRvKP4ls0MgRxk4UvlVDKSPdIvYPzX7orbJoyw4aZSYJEs+nGjyb8sh7JvQzM92k1yAnsKvJx1O6HoiFI9fkD7+r8BkqZpIx7pcdrgHXg+QzX0V3Bq+0WnFRg+s1dfbgd5K9vQi6gyhsr+AErqQgWd0ThkzzmfotuKhXXdTL6FJWcVxqCzEO0Pl8Gzv5SaHxpkbciwGP/5aljxBYsuGee9G+/NxlQKBgQDKXUzvYZvpDo8u7HCc+koh7N8XBZriL+Q8DhABnD0AgiC62n58Kig3KWgiHZgt/aZjJJEx3jilTvPSr59WQt4kHYh7C0K91N4X6Djd5XXkNXUTn7GUuvS6PsQbjvifeaRv6hFUbsIkbI5EniQaFphJ1C6ZsvsqnvJbHApBr6pPNwKBgQC3t0y/VWzUSBbuGcuWp4SwefVGLrFTN4TIXj/ibKR0gpbZS3Dic1OVZoZjgUCfbyFzD3/jwd7vJJZfCGgYX+PVziCGa8Vh5yMA7RKvXmFNTzjbqLUO4wDZ/W/z1qDo7iaMYR4GKXM3ucboXu6+8wM873v9U3f1noPC21SS++1lswKBgDnQC+G7rhIX8boDHG0MaE9m35kxJb2G1xp9Hf+Hxjm182nOcCJC3PhdYP2WHNrOw1FBqiVoCiDX/HptaAT514LT2SDl56xZ+xUzZ8OlAVgwGYGAtvf5rV7j/Zyt7MOKufqrEUZg2iATz1U1JLU7TUiSULniUzUq8awrx5ZafDpjAoGAULa2gEVOuAEoGdm5aWoV0Nb0HK5897unmcRWuurSYeHR1ovff439heDyYBs0Qhe4EW4Y2P6fLF/dtMjjuvm+Bnw2K/iDUp0S8uA1WljT1PxeVZtMWMsA38UJ/44nSc7/nqM4ZqqlVTFIo2S57aiknov05HpcdMv8xYpJIP6P8SMCgYBSecQyQuLBO3y1+mzIXl9YERd55kf5L7XoPY0ItC6s+nmiBexy7JPCXXg8ntuF5ZIlXuymjpHdcth5nbhO1m5er7pcQrEUX510XIukOaeb+73HxAEeR2IVHpEEIocpWWF4BxGzBKQ7EFBNaT9fdFJJDdlMuBcH8zPRaTBl2qmCkw==-----END PRIVATE KEY-----"
ENV FIREBASE_CONFIG_PRIVATE_KEY_ID="bab232fc4adeee94256eb46775b84784e8052ee8"
ENV FIREBASE_CONFIG_PROJECT_ID="ambigest-d92a3"
ENV FIREBASE_CONFIG_STORAGE_BUCKET="ambigest-d92a3.appspot.com"
ENV FIREBASE_CONFIG_TYPE="service_account"
ENV FIREBASE_CONFIG_TOKEN_URI="https://oauth2.googleapis.com/token"
ENV FIREBASE_CONFIG_UNIVERSE_DOMAIN="googleapis.com"
ENV MONGO_URL='mongodb+srv://ambigest-admin:ambigest.12345@cluster0.whrgwk5.mongodb.net/?retryWrites=true&w=majority'
ENV MONGO_DB='ambigestDb'

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the NestJS application
RUN npm run build

# Set the command to start the NestJS server
CMD [ "npm", "run", "start:prod" ]
