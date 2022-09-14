/**
 * basic server health
 */

import type {ImageRequest} from '../store/imageCreateStore';

// when we are on dev we want to specifiy 9000 as the port for the backend
// when we are on prod we want be realtive to the current url
const API_URL = import.meta.env.DEV ? 'http://localhost:9000' : '';


export const HEALTH_PING_INTERVAL = 5000; // 5 seconds
export const healthPing = async () => {

  const pingUrl = `${API_URL}/ping`;
  let response = await fetch(pingUrl)
  const data = await response.json();
  return data;
}

/**
 * the local list of modifications
 */
export const loadModifications = async () => {
  const url = `${API_URL}/modifications`;

  console.log('loadModifications', url);
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export const getSaveDirectory = async () => {
  const response = await fetch(`${API_URL}/output_dir`);
  const data = await response.json(); 
  return data[0];
};

/**
 * post a new request for an image
 */

export const MakeImageKey = 'MakeImage';
export const doMakeImage = async (reqBody: ImageRequest) => {

  const {seed, num_outputs} = reqBody;
  console.log('doMakeImage', seed, num_outputs);

  const res = await fetch(`${API_URL}/image`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(reqBody)
  });

  const data = await res.json();
  return data;
}


