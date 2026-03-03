/**
 * Orange Themed Sign Up Form
 * Created by: Makos Tech
 * Follow us on TikTok: https://www.tiktok.com/@makostech
 */

document.getElementById('signupForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  if(username && email && password) {
    alert('Account created successfully!');
    this.reset();
  }
});
