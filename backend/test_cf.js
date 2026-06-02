const accountId = 'b4c37814f833571aee24b457c1ff7268';
const token = 'your_cloudflare_token_here';
const model = '@cf/meta/llama-3.1-8b-instruct';

async function testCF() {
  const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Say hello in 5 words.' }
      ]
    })
  });
  
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

testCF();
