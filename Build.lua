os.execute("wget -O RobloxIcons.zip 'https://devforum.roblox.com/uploads/short-url/vHjNEH4jUjBlz9tl8Yetp6T1b99.zip'")
os.execute("unzip -o RobloxIcons.zip -d RobloxIcons")
os.execute("rm RobloxIcons.zip")
os.execute("rm -f RobloxIcons/RobloxCustom/index.theme")
os.execute("mv RobloxIcons/RobloxCustom/standard/* RobloxIcons/")
os.execute("sleep 0.1")
os.execute("rm -rf RobloxIcons/RobloxCustom")
os.execute("rm -rf RobloxIcons/RobloxCustom/standard")

os.execute(
	"wget -O Fonts/NotoSansRegular.ttf Fonts/https://github.com/openmaptiles/fonts/raw/refs/heads/master/noto-sans/NotoSans-Regular.ttf"
)
