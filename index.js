const express = require('express');
const app = express();
const axios = require('axios');
const port = 3000

// 跨域
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// 解析 JSON
app.use(express.json());

// ======================================
// 王者英雄列表接口
// ======================================
app.get('/api/herolist', async (req, res) => {
  try {
    const response = await axios.get('https://pvp.qq.com/web201605/js/herolist.json', {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        Referer: 'https://pvp.qq.com'
      }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: '获取失败' });
  }
});

// ======================================
// 获取王者英雄战力数据接口
// ======================================
app.get('/api/gethero', async (req, res) => {
  const { hero, type } = req.query;
  try {
    const response = await axios.get(
      `https://api.wzryqz.cn/gethero?hero=${encodeURIComponent(hero.trim())}&type=${type}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          'Accept': 'application/json'
        }
      });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: '获取失败' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})