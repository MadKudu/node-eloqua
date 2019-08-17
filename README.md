# node-eloqua

A node.js wrapper for the Eloqua API

[![CircleCI](https://circleci.com/gh/MadKudu/node-eloqua/tree/master.svg?style=svg)](https://circleci.com/gh/MadKudu/node-eloqua/tree/master)
[![Code Climate](https://codeclimate.com/github/MadKudu/node-eloqua/badges/gpa.svg)](https://codeclimate.com/github/MadKudu/node-eloqua)
[![Issue Count](https://codeclimate.com/github/MadKudu/node-eloqua/badges/issue_count.svg)](https://codeclimate.com/github/MadKudu/node-eloqua)
[![Test Coverage](https://codeclimate.com/github/MadKudu/node-eloqua/badges/coverage.svg)](https://codeclimate.com/github/MadKudu/node-eloqua/coverage)
[![Dependencies](https://david-dm.org/MadKudu/node-eloqua.svg)](https://david-dm.org/MadKudu/node-eloqua)

```
npm install eloqua
```

## General usage

```javascript
const eloqua = new Eloqua({
  siteName: ...,
  userName: ...,
  password: ...
});
const results = await eloqua.contacts.getAll();
```

## Bulk export

[API Documentation](https://community.oracle.com/community/topliners/code-it/blog/2016/04/29/exporting-all-activities-using-the-bulk-api)

### Get the first page of results

```javascript
const results = await eloqua.bulk.runExport(name, fields, filter);
```

### Get a stream of the results

```javascript
const stream = await eloqua.bulk.getExportStream(name, fields, filter);
```
