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
</ul>

<!-- Initialize -->

#### Initialize

<h5>Method</h5>

initialize(element: HTMLElement, config: InitializeConfig): Promise

<h5>Parameters</h5>

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| element | HTMLElement | Yes | - | The element on your DOM that the SDK Iframe will be appended to |
| config | InitializeConfig | Yes | - | Config for the SDK |

<h5>Interfaces</h5>

*InitializeConfig*

```javascript
interface InitializeConfig {
    conversationProfile: string; // Google CCAI conversation profile
    connectorUrl: string; // Google Cloud connector URL 
    channel: enum; // 'chat', 'voice', 'omnichannel'
    conversationId?: string // The unique conversation identifier
    features: string[] // 'GEN_ASSIST', 'SUMMARIZATION', 'TRANSCRIPT', 'SUGGESTIONS', 'SMART_REPLY'. Tab order is based on the order of the features you provide
    iframeUrl?: string // If your iframeUrl is different from your connectorUrl, provide this
}
```

<!-- Navigate To -->

#### Navigate To

navigateTo()

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

<!-- ROADMAP -->

## License

<p>MIT © <a href="https://ttecdigital.com/">TTEC Digital, LLC</a>