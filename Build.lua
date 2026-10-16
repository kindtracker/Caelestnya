local RequiredFolders = {
	"Web/RobloxIcons",
	"Web/Fonts",
}

local RobloxInstanceIconsCommands = {
	"wget -O RobloxIcons.zip 'https://devforum.roblox.com/uploads/short-url/vHjNEH4jUjBlz9tl8Yetp6T1b99.zip'",
	"unzip -o RobloxIcons.zip -d RobloxIcons",
	"rm -f RobloxIcons.zip",
	"rm -f RobloxIcons/RobloxCustom/index.theme",
	"mv RobloxIcons/RobloxCustom/standard/* Web/RobloxIcons/",
	"rm -rf RobloxIcons",
}

local RobloxToolbarIconsCommands = {}

local ToolbarIcons = {
	{
		IconName = "Cursor",
		Url = "https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/5X/d/0/d/4/d0d410c6566a48e77bffb13b34e3967a9494418a.png",
	},
	{
		IconName = "Rotate",
		Url = "https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/5X/e/4/3/0/e430d04eb9bf9e1e2081d7133ff1cfe89de1e737.png",
	},
	{
		IconName = "Move",
		Url = "https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/5X/f/c/b/5/fcb5ee2cd6b500eb2d349f424fd9254779bcb847.png",
	},
	{
		IconName = "Resize",
		Url = "https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/5X/2/d/b/4/2db48ce3a8f920d12abc08cb9989c9bcbc4b11d5.png",
	},
}

for _, ToolbarIcon in ipairs(ToolbarIcons) do
	local Command = string.format("wget -O Web/RobloxIcons/%s.png '%s'", ToolbarIcon.IconName, ToolbarIcon.Url)

	table.insert(RobloxToolbarIconsCommands, Command)
end

local DownloadFontsCommands = {}

local DefaultFonts = {
	{
		FontName = "NotoSansRegular",
		Url = "https://github.com/openmaptiles/fonts/raw/refs/heads/master/noto-sans/NotoSans-Regular.ttf",
	},
}

for _, Font in ipairs(DefaultFonts) do
	local Command = string.format("wget -O Web/Fonts/%s.ttf '%s'", Font.FontName, Font.Url)

	table.insert(DownloadFontsCommands, Command)
end

local Commands = {}

for _, RequiredFolder in ipairs(RequiredFolders) do
	local Command = string.format("mkdir -p Web/%s", RequiredFolder)
	table.insert(Commands, Command)
end

for _, Command in ipairs(RobloxInstanceIconsCommands) do
	table.insert(Commands, Command)
end

for _, Command in ipairs(RobloxToolbarIconsCommands) do
	table.insert(Commands, Command)
end

for _, Command in ipairs(DownloadFontsCommands) do
	table.insert(Commands, Command)
end

for _, Command in ipairs(Commands) do
	print(Command)
	local Success = os.execute(Command)
end
