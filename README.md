<br />
<div align="center">
    <h3 align="center">TTEC CCAI AA SDK</h3>
    <p align="center">
        Software Development Kit for TTEC's CCAI AA App
        <br />
        <br />
        ·
        <a href="https://github.com/Dig-Voice-AI/ccai-aa-sdk/issues">Report Bug</a>
        ·
        <a href="https://github.com/Dig-Voice-AI/ccai-aa-sdk/issues">Request Feature</a>
    </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
    <summary>Table of Contents</summary>
    <ol>
        <li><a href="#about-the-project">About the Project</a></li>
        <li><a href="#install">Install</a></li>
        <li><a href="#getting-started">Getting Started</a></li>
        <li><a href="#api-reference">API Reference</a></li>
        <li><a href="#event-reference">Event Reference</a></li>
        <li><a href="#roadmap">Roadmap</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#license">License</a></li>
    </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<p>What does CCAI-AA-SDK stand for? Contact Center Artificial Inteligence Agent Assist Software Development Kit. This is TTEC's SDK to be used for integrating TTEC's CCAI AI App into your application. Have fun and find new ways to unlock powerful agent assist experiences for your Enterprise.</p>

<!-- Install -->

## Install

```sh
npm install @ttec-digital/ccai-aa-sdk
```

<p>or</p>

```sh
yarn add @ttec-digital/ccai-aa-sdk
```

<!-- Install -->

## Getting Started

The following is an example to get you going quickly.

```html
<div id="sdk-container">
</div>

<script type="text/javascript">
import AgentAssistSdk from '@ttec-digital/ccai-aa-sdk' 

async function initalizeSDK() {
    const hostElement = document.getElementById("sdk-container")

    try {
        await agentAssistSdk.initialize(hostElement, {
            conversationProfile: 'projects/<< project name >>/locations/<< project location name >>/conversationProfiles/<< conversation profile id >>',
            connectorUrl: '<< cloud run ui connector url >>',
            channel: 'chat',
            features: ['GEN_ASSIST', 'SMART_REPLY', 'SUMMARIZATION', 'TRANSCRIPT'],
        })  
    } catch(e) {
        console.error(e)
    }
}
</script>
```

<!-- API Reference -->

## API Reference

### SDK Methods

<ul>
    <li><a href="#initialize">initialize()</a></li>
    <li><a href="#navigate-to">navigateTo()</a></li>
    <li><a href="#analyze-content">analyzeContent()</a></li>
    <li><a href="#add-listener">addListener()</a></li>
</ul>

<!-- Initialize -->

#### Initialize

Initializes the SDK in the provided element and sets the config to be used. Always call this method before calling other methods.

<h5>Method</h5>

initialize(element: HTMLElement, data: InitializeData): Promise

<h5>Parameters</h5>

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| element | HTMLElement | Yes | - | The element on your DOM that the SDK Iframe will be appended to |
| data | InitializeData | Yes | - | Config for the SDK |

<h5>Interfaces</h5>

**InitializeData**

```javascript
interface InitializeData {
    conversationProfile: string;
    connectorUrl: string;
    channel: string;
    conversationId?: string 
    features: array
    iframeUrl?: string
}
```

***conversationProfile***

| Type | Required | Default | Description |
| --- | --- | --- | --- |
| string | true | - | Google CCAI conversation profile |

***connectorUrl***

| Type | Required | Default | Description |
| --- | --- | --- | --- |
| string | true | - | Google Cloud connector URL |

***channel***

| Type | Required | Default | Description |
| --- | --- | --- | --- |
| string | true | - | Channel of the conversation. Valid Values: 'chat', 'voice', 'omnichannel'. When no conversation exists, use 'chat'. |

***conversationId***: 

| Type | Required | Default | Description |
| --- | --- | --- | --- |
| string | true | - | Unique conversation identifier |

***features***

| Type | Required | Default | Description |
| --- | --- | --- | --- |
| array | true | - | One or more pages to display. ['GEN_ASSIST', 'SUMMARIZATION', 'TRANSCRIPT', 'SUGGESTIONS', 'SMART_REPLY']. Tab order is based on the order of the features you provide |

***iframeUrl***

| Type | Required | Default | Description |
| --- | --- | --- | --- |
| string | true | - | If your iframeUrl is different from your connectorUrl, provide this |

<!-- Navigate To -->

#### Navigate To

Changes the active page.

<h5>Method</h5>

navigateTo(data: NavigateToData): void

<h5>Parameters</h5>

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| data | NavigateToData | Yes | - |  - |

<h5>Interfaces</h5>

**NavigateToData**

```javascript
interface NavigateToData {
    tab: string;
}
```

***tab***

| Type | Required | Default | Description |
| --- | --- | --- | --- |
| string | true | - | The page to change to. Valid Values: 'GEN_ASSIST', 'SUMMARIZATION', 'TRANSCRIPT', 'SUGGESTIONS', 'SMART_REPLY'

<!-- Analyze Content -->

#### Analyze Content

Sends new content to be analyzed by agent assist.

<h5>Method</h5>

analyzeContent(data: AnalyzeContentData): void

<h5>Parameters</h5>

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| data | AnalyzeContentData | Yes | - |  - |

<h5>Interfaces</h5>

**AnalyzeContentData**

```javascript
interface AnalyzeContentData {
    participantRole: string;
    request: AnalyzeContentRequest;
}
```

***participantRole***

| Type | Required | Default | Description |
| --- | --- | --- | --- |
| string | true | - | The participant role. Valid Values: 'END_USER', 'HUMAN_AGENT', 'AUTOMATED_AGENT'

***request***

| Type | Required | Default | Description |
| --- | --- | --- | --- |
| object | true | - | See AnalyzeContentRequest.

**AnalyzeContentRequest**

```javascript
interface AnalyzeContentRequest {
    textInput: TextInput;
    messageSendTime: string;
}
```

***messageSendTime***

| Type | Required | Default | Description |
| --- | --- | --- | --- |
| string | true | - | The message timestamp. Example: messageSendTime: new Date().toISOString()

**TextInput**

```javascript
interface TextInput {
    text: string;
}
```

***text***

| Type | Required | Default | Description |
| --- | --- | --- | --- |
| string | true | - | The UTF-8 encoded natural language text to be processed. Text length must not exceed 256 characters for virtual agent interactions.

<!-- Add Listener -->

#### Add Listener

Adds a new listener for your application to receive events about a certain topic.

<h5>Method</h5>

addListener(topic: string, callback: function(data)): void

<h5>Parameters</h5>

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| topic | string | Yes | - |  The topic to get events from. Valid values: 'analyze-content-response-received', 'conversation-details-received', 'list-messages-response-received', 'smart-reply-selected' |
| callback | function | Yes | - |  The function to return when a new event occurs. All events return a single parameter (data). |

<!-- Event Reference -->

## Event Reference

### Event Topics

<ul>
    <li><a href="#analyze-content-response-received">analyze-content-response-received</a></li>
    <li><a href="#conversation-details-received">conversation-details-received</a></li>
    <li><a href="#list-messages-response-received">list-messages-response-received</a></li>
    <li><a href="#smart-reply-selected">smart-reply-selected</a></li>
    
</ul>

#### Analyze Content Response Received

Dispatched when a new AnalyzeContentResponse has been received.

**Payload**

See <a href="https://cloud.google.com/agent-assist/docs/ui-modules-events-documentation#AnalyzeContentResponseReceivedPayload">AnalyzeContentResponseReceivedPayload</a>

#### Conversation Details Received

Dispatched when conversation details are received from the SDK (including agent and customer info).

**Payload**

See <a href="https://cloud.google.com/agent-assist/docs/ui-modules-events-documentation#ConversationDetailsReceivedPayload">ConversationDetailsReceivedPayload</a>

#### List Messages Response Received

Dispatched when a list messages response is received.

**Payload**

See <a href="https://cloud.google.com/agent-assist/docs/ui-modules-events-documentation#ListMessagesResponseReceivedPayload">ListMessagesResponseReceivedPayload</a>

#### Smart Reply Selected

Dispatched when a list messages response is received.

**Payload**

See <a href="https://cloud.google.com/agent-assist/docs/ui-modules-events-documentation#SmartReplySelection">SmartReplySelection</a>

<!-- ROADMAP -->

## Roadmap

<!-- ROADMAP -->

## Roadmap

-   [ ] No enhancements scheduled at this time

See the [open issues](https://github.com/Dig-Voice-AI/ccai-aa-sdk/issues) for a full list of proposed features (and known issues).

<!-- CONTACT -->

## Contact

Nathan Galloway - nathan.galloway@ttecdigital.com

Project Link: [https://github.com/Dig-Voice-AI/ccai-aa-sdk](https://github.com/Dig-Voice-AI/ccai-aa-sdk)

<!-- License -->

## License

<p>MIT © <a href="https://ttecdigital.com/">TTEC Digital, LLC</a>