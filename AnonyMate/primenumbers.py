import  math
#!/usr/bin/python3
def is_prime(n):
    """
        Displays prime numbers btwn 1-250 and writes them in a file
        Args: none
        Return: none
    """
    if n  <= 1:
       return False

    for i in range(2, int(math.sqrt(n)) + 1):
        if n % i == 0:
            return False
    return True


with open("results.txt","w") as file:
    for num in range(1, 251):
        if is_prime(num):
            print(num)
            file.write(str(num) + "\n")


            
