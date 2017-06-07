#!/usr/bin/perl
use warnings FATAL => 'all';
use strict;
use Encode;
use JSON;
my $json = new JSON;
my $js;

my $registry_end = `npm_use_registry --default`;
# 让代理设置完成
sleep(1);
print $registry_end;
##############################################  处理package.json
#  读取原始package.json
if (open(DATA, "<package.json") or die "package.json 文件无法打开, $!"){
  while(<DATA>)
    {
      $js .= "$_";
    }
}
close(MYFILE);
#  原始package.json
my $package_info = $json->decode($js);

#  原始package.json的版本
my $package_info_version = $package_info->{'version'};
#  版本列表
my @version_arr = split(/\./, $package_info_version);
$version_arr[-1]++;
#  设置新版本
$package_info->{'version'} = join('.', @version_arr);

#  生成新版本的package.json
my $package_info_plus = $json->encode($package_info);
#  写入package.json
if (open(DATA, ">package.json") or die "package.json 文件无法打开, $!"){
  print DATA $package_info_plus;
}
close(MYFILE);

##############################################  执行编译命令
system("npm run build");
my $result = system("npm publish");

#  发布成功
if ($result == 0){
  print "发布成功\n";
  system("npm_use_registry --inland");
  exit 0;
}

#  发布失败
print "发布失败\n";
#  回退package.json
if (open(DATA, ">package.json") or die "package.json 文件无法打开, $!"){
  print DATA $js;
}
close(MYFILE);
system("npm_use_registry --inland");
exit 0;

