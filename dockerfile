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
ENV FIREBASE_CONFIG_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC4uGU1Gj2Ncwo1\nmjoM+Jus1hn9xSsdWG/C65SU2DOShocep4f2hW7/ENcissk7P/T/+txwsDd8T9Jo\nxSqfDfjRyDYYl//fygJ3UYkABMGwi3dzmJeBikbmCdfm71K3BExMuryV5r1eO6G1\njNzp+5sfBsUZSew7UWz9UsPiNN+dHAAxeFkR6NAg/+ErhnC0lGYb8KK2IzPq+k7q\n5zTX4/LTFKq3FzIpDIKJNgJwOCuahaICoeyDkM1M61QlO6bPCZCrJw37F64a60Bk\nNSJSWEg0AqZi04MGLOd3lH/In2EhMgQjqNqYQBRhRsqx5X7VX7z4H4jJo6B/dUXQ\ndfIeDNzlAgMBAAECggEABJ1vKK2hGlq+Lc4oKdRMcWJAMBZAIds1UzTQpFjAp+Yo\nBvSvdMUeW42EaBFe7fwtIKsYEFGt8gAwu2p3pBWOVDfQ3Poiy9v8bHygDcNqQmd0\nApjH0KL16zMVdSdtoduf4cffKwCV735Rms6FsDikX/KEZwGxJV8/EZb2HjC54hWU\nfOXmEECYAHJtpvKL4mW+GhKii4budY8G+3657VKp3fvhYtTEde+f8vY4YBGPsrmU\nYnfk/y6ZYJlgV8w0Js4bHsrPUhG2oRwqiZqHDJVqwymCzU2d9bzE/UBaTSAXaSy+\ngBjbbYE/DDT0RclrEQdu+v4+4E1bbY+FWF1u8Lv+EQKBgQDdeyQ0Dyz6tPPUfx1Z\n3Bbp8kyoc38p/IKwvWBlATJ3QGtiJiOlwrTaSAkIwO7+BvP2UBDYNexfs4yB3eRc\njlWo2pUtVmnbYY+XB/+CKRc2TFRDMDVd0fBbJJgS81+EogWlN6kQKOLAXtwTFwJq\nwkS8p8H/za/KnuMr0sONUFf7sQKBgQDVgoovamaNRJRfEuX2D1tomdDo61CmzJiZ\n8fCwU45YNPYCWviNjGR69EeWkXjSuTa8ZWNALcdc9LWo15UWa9iu1Utyk3WjkK8r\nKLaTNK5L/ArLyzZrqZ6hWZnUjSRSh+OZ+gnLFP2KMS5QhFW+wTeQnvljx+/4CXbb\nSfnETKpldQKBgQC4MtbcORbWdzIms4VMm7+u1+YrXssOt0RWC1olBsba6Qel/EQ/\nctyIgcqJrjPVryCs5M/tkYNB4Ijl5Q4sb/AL26afqzOk0dHi8TLuJJB6hya5Llnj\n6ls04g1cDW6OV1XMn6sKloZnKT1s3wESmvkh0X+F6KHgKR6T7tjWKVDTMQKBgQCh\nocIUpRrfhPRBiR/3h6auaAtD2KhkrWw01nhcM9UFp4o5PD7/gTGr9vOe45+w/q+W\nLbbWJhHPqB1BpXpiz9/ocuY75a/f1C8XoCmfBPmR4ksV/k/Db1P8V8VhqDvAEslV\njnkNeWV60UJ7h8MVtlXnMMIhLIHYpumIltbzKQqx5QKBgQChFbSNe2pL4Y5nIFRr\nDyRy/Yld7BdrN3ffGLbTV0r3qjVXU7gHUDIrck8IQ039bb7UdorAO7Xu3tp3wHm4\nkCRLoybo1zHcEFPW4EXaB1CDg9hnqWPoELR5In/KSEmReklW1VvY/+NI9iAG81H7\noEAJ3cCVq2RVPQByQnKtPqfkXw==\n-----END PRIVATE KEY-----\n"
ENV FIREBASE_CONFIG_PRIVATE_KEY_ID="77f9e65ffcb1432ee33092ca1a19fa2d7fe43717"
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
