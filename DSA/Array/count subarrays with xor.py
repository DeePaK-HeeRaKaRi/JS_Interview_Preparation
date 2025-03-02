arr=[2,5,3,7,8]
k = 3
xor=0
cnt=0
hm={}
for i in arr:
            xor=xor^i
            if(xor==k):
                cnt+=1
            y=xor^k
            if(y in hm):
                cnt+=hm[y]
            if(xor in hm):
                hm[xor]+=1
            else:
                hm[xor]=1
print(cnt)
