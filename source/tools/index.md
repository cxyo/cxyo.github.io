---
title: tools
date: 2022-06-15 11:15:23
---

<div class="post-body">
   <div id="links">
      <style>
         .links-content{
         margin-top:1rem;
         }
         .link-navigation::after {
         content: " ";
         display: block;
         clear: both;
         }
         .card {
         width: 45%;
         font-size: 1rem;
         padding: 10px 20px;
         border-radius: 4px;
         transition-duration: 0.15s;
         margin-bottom: 1rem;
         display:flex;
         }
         .card:nth-child(odd) {
         float: left;
         }
         .card:nth-child(even) {
         float: right;
         }
         .card:hover {
         transform: scale(1.1);
         box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
         }
         .card a {
         border:none;
         }
         .card .ava {
         width: 3rem!important;
         height: 3rem!important;
         margin:0!important;
         margin-right: 1em!important;
         border-radius:4px;
         }
         .card .card-header {
         font-style: italic;
         overflow: hidden;
         width: 100%;
         }
         .card .card-header a {
         font-style: normal;
         color: #2bbc8a;
         font-weight: bold;
         text-decoration: none;
         }
         .card .card-header a:hover {
         color: #d480aa;
         text-decoration: none;
         }
         .card .card-header .info {
         font-style:normal;
         color:#a3a3a3;
         font-size:14px;
         min-width: 0;
         overflow: hidden;
         white-space: nowrap;
         }
      </style>
      <div class="links-content">
         <div class="link-navigation">
            <div class="card">
               <img class="ava" src="http://httpbin.org/static/favicon.ico" />
               <div class="card-header">
                  <div>
                     <a href="http://httpbin.org/get">练习网络请求</a>
                  </div>
                  <div class="info">该网站可以模拟各种网络请求操作。</div>
               </div>
            </div>
            <div class="card">
               <img class="ava" src="https://git-scm.com/images/logo@2x.png" />
               <div class="card-header">
                  <div>
                     <a href="https://git-scm.com/downloads">git下载</a>
                  </div>
                  <div class="info">git官网下载</div>
               </div>
            </div>
            <div class="card">
               <img class="ava" src="https://nodejs.org/static/images/logo.svg" />
               <div class="card-header">
                  <div>
                     <a href="https://nodejs.org/">node下载</a>
                  </div>
                  <div class="info">node官网下载</div>
               </div>
            </div>
            <div class="card">
               <img class="ava" src="https://avatars.githubusercontent.com/u/12621342?v=4" />
               <div class="card-header">
                  <div>
                     <a href="https://github.com/Molunerfinn/PicGo/releases">picgo下载</a>
                  </div>
                  <div class="info">picgo官网下载</div>
               </div>
            </div>
            <div class="card">
               <img class="ava" src="https://avatars.githubusercontent.com/u/12959900?s=200&v=4" />
               <div class="card-header">
                  <div>
                     <a href="https://www.typora.io/">typora下载</a>
                  </div>
                  <div class="info">typora官网下载</div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>