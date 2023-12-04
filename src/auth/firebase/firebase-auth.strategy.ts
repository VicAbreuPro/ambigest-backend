import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import config from './firebaseConfig';
import * as firebase from 'firebase-admin';

const firebase_params = {
    type: config.type,
    projectId: config.project_id,
    privateKeyId: config.private_key_id,
    privateKey: config.private_key,
    clientEmail: config.client_email,
    clientId: config.client_id,
    authUri: config.auth_uri,
    tokenUri: config.token_uri,
    authProviderX509CertUrl: config.auth_provider_x509_cert_url,
    clientC509CertUrl: config.client_x509_cert_url,
};

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(Strategy, 'firebase-auth'){
    private defaultApp: any;

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });

        this.defaultApp = firebase.initializeApp({
            credential: firebase.credential.cert(firebase_params),
        });

    }

    async validate(token: string) {
        const firebaseUser: any = await this.defaultApp
        .auth()
        .verifyIdToken(token, true)
        .catch((err: { message: any; }) => {
            throw new UnauthorizedException(err.message);
        });

        if (!firebaseUser) {
            throw new UnauthorizedException();
        }

        return firebaseUser;
    }
  }
  