os.execute("wget -O RobloxIcons.zip 'https://devforum.roblox.com/uploads/short-url/vHjNEH4jUjBlz9tl8Yetp6T1b99.zip'")
os.execute("unzip -o RobloxIcons.zip -d RobloxIcons")
os.execute("rm RobloxIcons.zip")
os.execute("rm -f RobloxIcons/RobloxCustom/index.theme")
os.execute("mv RobloxIcons/RobloxCustom/standard/* RobloxIcons/")
os.execute("sleep 0.1")
os.execute("rm -rf RobloxIcons/RobloxCustom")
os.execute("rm -rf RobloxIcons/RobloxCustom/standard")

os.execute(
	'wget -O RobloxIcons/Play.png "https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/5X/d/0/d/4/d0d410c6566a48e77bffb13b34e3967a9494418a.png"'
)
os.execute(
	'wget -O RobloxIcons/Rotate.png "https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/5X/e/4/3/0/e430d04eb9bf9e1e2081d7133ff1cfe89de1e737.png"'
)
os.execute(
	'wget -O RobloxIcons/Move.png "https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/5X/f/c/b/5/fcb5ee2cd6b500eb2d349f424fd9254779bcb847.png"'
)
os.execute(
	'wget -O RobloxIcons/Resize.png "https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/5X/2/d/b/4/2db48ce3a8f920d12abc08cb9989c9bcbc4b11d5.png"'
)

os.execute(
	'wget -O Fonts/NotoSansRegular.ttf "https://github.com/openmaptiles/fonts/raw/refs/heads/master/noto-sans/NotoSans-Regular.ttf"'
)
