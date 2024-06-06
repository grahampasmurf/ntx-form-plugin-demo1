import { BlobServiceClient } from '@azure/storage-blob';
import dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

const blobServiceClient = BlobServiceClient.fromConnectionString(
	process.env.AZURE_STORAGE_CONNECTION_STRING
);

const containerClient = blobServiceClient.getContainerClient(
	process.env.AZURE_STORAGE_CONTAINER_NAME
);
await containerClient.createIfNotExists({
	access: 'container',
});

const headers = {
	blobContentType: 'application/javascript',
};

const promises = fs
	.readdirSync('./build/release', { withFileTypes: true })
	.map((file) => {
		const blockBlobClient = containerClient.getBlockBlobClient(
			process.env.AZURE_STORAGE_FOLDER_NAME
				? `${process.env.AZURE_STORAGE_FOLDER_NAME}/${file.name}`
				: file.name
		);
		const data = fs.readFileSync(`./build/release/${file.name}`, {
			encoding: 'UTF8',
		});
		blockBlobClient.upload(data, data.length, {
			blobHTTPHeaders: headers,
		});
		return blockBlobClient.url;
	});

Promise.all(promises).then((results) => {
	results.forEach((result) => console.log(result));
});
