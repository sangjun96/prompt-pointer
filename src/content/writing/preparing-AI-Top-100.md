---
title: "Preparing a KakaoTalk Bot for the AI Top 100"
publishedAt: "2026.10.25"
summary: "prepared the KakaoTalk bot setup before the AI Top 100 preliminary round using Cloudflare Agents and Workers. I added a simple webhook security check and built a local chat interface with React and Assistant UI for testing."
draft: false
---

A week before the AI Top 100 preliminary round, i recieved an email with a link to a guide for setting up a KakaTalk bot. The competition was about building an AI agent for KakaoTalk.

I wanted to save as much time as possible during the preliminary round, so i decided to prepare the intergration and interface in advance. The API documentation was clear, so i shared it with Codex as a PDF and started building on Cloudflare Agents and Workers.

Codex handled most of the work, but I also guided it in a few areas and gave it additional instructions.

Since the bot would be public and users needed to register without signing in, I started with security. When KakaoTlak receives a message, it sends a request to the bot's webhook. KakaoTalk lets you add a custom header to that request, so i created a secret key and checked it whenever the webhook received a request. This gave me a simple way to verify incoming requests.

Next, I used the adapter pattern to seperate the message webhook from the service that sends replies. In development, I cloud test the bot locally with a chat interface. After deployment, the bot could recieve messages through KakaoTalk instead.

To make local testing easier, I built a simple chat interface with React and Assistant UI.
