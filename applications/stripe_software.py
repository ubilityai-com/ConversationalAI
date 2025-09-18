import stripe
import json

def stripe_get_balance(cred,params,**kwargs):
    """
        Returns the balance currently on your Stripe account.
     :param str apiKey: Used for authentication purposes. 

     :return: Details about the retrieved balance(amount,currency,..).
     :rtype: dict
    """
    try:
        creds = json.loads(cred)
        if "apiKey" in creds:
            api_key = creds["apiKey"]
            stripe.api_key = api_key
            balance = stripe.Balance.retrieve()
            result = json.loads(json.dumps(balance, default=str))
            return result
        else:
            raise Exception("Missing input data")
    except Exception as e:
        return {"Error": str(e)}


def stripe_create_paymentintent(cred,params,**kwargs):
    """
     Creates a PaymentIntent object  with custom properties if added.

    :param str apiKey: Used for authentication purposes. 
    :param dict params: contains properties to be added to the created paymentIntent

        - :amount: (int, Required) Amount intended to be collected by this PaymentIntent
        - :currency: (str,Required) Three-letter ISO currency code, in lowercase
        - :automatic_payment_methods: (dict) contains the item 'enabled' (bool)
        - :shipping: (dict) Shipping information for the PaymentIntent
        - :description: (str) An arbitrary string attached to the object. Often useful for displaying to users.
        - :confirm: (bool) Set to true to attempt to confirm this PaymentIntent this PaymentIntent immediately.
        - :receipt_email: (str) Email address to send the receipt to. 
        - :customer: (str) ID of the Customer this PaymentIntent belongs to, if one exists
    :return: Details about the created paymentIntent
    :rtype: dict
      :Examples:
    >>> params = {
       "amount":100
       "currency":"eur",
       "automatic_payment_methods":{ 
              "enabled":True
         },
        "shipping":{     
                "address" : { 
                        "city":"",
                        "country":"",
                        "line1":"",
                        "postal_code":"",
                        "state":""
                },
                "name":"", 
                "phone":"",
                "tracking_number":"000",
                },
                "description":"new payment",
                "confirm":False, 
                "receipt_email":"", 
                "customer":"", }        

    """
    try:
        creds = json.loads(cred)
        required_params = ['amount', 'currency']
        if all(param in params for param in required_params) and "apiKey" in creds:
            api_key = creds["apiKey"]
            payment_param = {}
            for key, value in params.items():
                if value:
                    payment_param[key] = value
            stripe.api_key = api_key
            payment = stripe.PaymentIntent.create(
                **payment_param
            )
            result = json.loads(json.dumps(payment, default=str))
            return result
        else:
            raise Exception("Missing input data")
    except Exception as e:
        return {"Error": str(e)}


def stripe_update_paymentintent(cred,params,**kwargs):
    """
     Updates a PaymentIntent object  with custom properties if added.

    :param str apiKey: Used for authentication purposes. 
    :param dict params: contains properties to be added to the updated paymentIntent

        - :payment_id: (str,REQUIRED) the id of the payment to be modified
        - :amount: (str) Amount intended to be collected by this PaymentIntent
        - :currency: (str) Three-letter ISO currency code, in lowercase
        - :automatic_payment_methods: (dict) contains the item 'enabled' (bool)
        - :shipping: (dict) Shipping information for the PaymentIntent
        - :description: (str) An arbitrary string attached to the object. Often useful for displaying to users.
        - :confirm: (bool) Set to true to attempt to confirm this PaymentIntent this PaymentIntent immediately.
        - :receipt_email: (str) Email address to send the receipt to. 
        - :customer: (str) ID of the Customer this PaymentIntent belongs to, if one exists
    :return: Details about the updated paymentIntent
    :rtype: dict
    """
    try:
        creds = json.loads(cred)
        if 'payment_id' in params and "apiKey" in creds:
            api_key = creds["apiKey"]
            payment_param = {}
            for key, value in params.items():
                key_to_skip = ['payment_id']
                if key in key_to_skip:
                    continue
                else:
                    payment_param[key] = value
            stripe.api_key = api_key
            id = params['payment_id']
            payment = stripe.PaymentIntent.modify(
                id,
                **payment_param
            )
            result = json.loads(json.dumps(payment, default=str))
            return result
        else:
            raise Exception("Missing input data")
    except Exception as e:
        return {"Error": str(e)}


def stripe_get_paymentintent(cred,params,**kwargs):
    """
     Returns a PaymentIntent object  with its details

    :param str apiKey: Used for authentication purposes. 
    :param dict params: contains the id of the paymentIntent to be retrieved.

        - :payment_id: (str,REQUIRED) the id of the payment to be retrieved
    :return: Details about the retrieved paymentIntent
    :rtype: dict
    """
    try:
        creds = json.loads(cred)
        if 'payment_id' in params and "apiKey" in creds:
            api_key = creds["apiKey"]
            id = params['payment_id']
            stripe.api_key = api_key
            payment = stripe.PaymentIntent.retrieve(id)
            result = json.loads(json.dumps(payment, default=str))
            return result
        else:
            raise Exception("Missing input data")
    except Exception as e:
        return {"Error": str(e)}


def stripe_cancel_paymentintent(cred,params,**kwargs):
    """
        Deletes a PaymentIntent object  with its details

       :param str apiKey: Used for authentication purposes. 
       :param dict params: contains the id of the paymentIntent to be deleted.

           - :payment_id: (str,REQUIRED) the id of the payment to be deleted
       :return: Details about the deleted paymentIntent
       :rtype: dict
    """
    try:
        creds = json.loads(cred)
        if 'payment_id' in params and "apiKey" in creds:
            api_key = creds["apiKey"]
            to_cancel = {}
            key_to_skip = ['payment_id']
            for key, value in params.items():
                if key in key_to_skip:
                    continue
                else:
                    to_cancel[key] = value
            id = params['payment_id']
            stripe.api_key = api_key
            canceled = stripe.PaymentIntent.cancel(id, **to_cancel)
            result = json.loads(json.dumps(canceled, default=str))
            return result
        else:
            raise Exception("Missing input data")
    except Exception as e:
        return {"Error": str(e)}


def stripe_get_many_paymentintents(cred,params,**kwargs):
    """
        Returns a list of PaymentIntent objects with specific properties if added

       :param str apiKey: Used for authentication purposes. 
       :param dict params: contains the details of the paymentIntents to be retrieved.

           - :customer: (str) Only return PaymentIntents for the customer that this customer ID specifies.
           - :ending_before: (str) defines your place in the list
           - :starting_after: (str) defines your place in the list
           - :limit: (str) can range between 1 and 100, and the default is 10.
       :return: Details about the retrieved paymentIntents
       :rtype: dict
    """
    try:
        creds = json.loads(cred)
        if "apiKey" in creds:
            api_key = creds["apiKey"]
            payments = {}
            for key, value in params.items():
                payments[key] = value
            stripe.api_key = api_key
            response = stripe.PaymentIntent.list(**payments)
            result = json.loads(json.dumps(response, default=str))
            return result
        else:
            raise Exception("Missing input data")
    except Exception as e:
        return {"Error": str(e)}


def stripe_create_customer(cred,params,**kwargs):
    """
     Creates a Customer object  with custom properties if added.

    :param str apiKey: Used for authentication purposes. 
    :param dict params: contains properties to be added to the created customer

        - :name: (str, Required) The customer's full name or business name.
        - :description: (str) An arbitrary string that you can attach to a customer object
        - :email: (dict) Customer's email address 
        - :address: (dict) The customer's address.
        - :shipping: (str) The customer's shipping information
        - :balance: (int)  An integer amount in cents that represents the customer's current balance
        - :phone: (str) The customer's phone number.
    :return: Details about the created customer
    :rtype: dict
    :Examples:
    >>> params = {
                    "name":"marie",
                    "description":"neww customerr", 
                    "email":"sample@mail.com", 
                    "address" : { 
                            "city":"",
                            "country":"",
                            "line1":"",
                            "postal_code":"",
                            "state":""  
                        },
                        "shipping":{     
                            "address" : { 
                                    "city":"",
                                    "country":"",
                                    "line1":"",
                                    "postal_code":"",
                                    "state":""
                            },
                            "name":"", 
                            "phone":"",   }, }



    """
    try:
        creds = json.loads(cred)
        required_params = ['name']
        if all(param in params for param in required_params) and "apiKey" in creds:
            api_key = creds["apiKey"]
            customer_param = {}
            for key, value in params.items():
                if value:
                    customer_param[key] = value
            stripe.api_key = api_key
            customer = stripe.Customer.create(**customer_param)
            result = json.loads(json.dumps(customer, default=str))
            return result
        else:
            raise Exception("Missing input data")
    except Exception as e:
        return {"Error": str(e)}


def stripe_update_customer(cred,params,**kwargs):
    """
     Updates a Customer object  with custom properties if added.

    :param str apiKey: Used for authentication purposes. 
    :param dict params: contains properties to be added(or modified) to the updated customer

        - :customer_id: (str,REQUIRED) the id of the customer to be modified
        - :name: (str, REQUIRED) The customer's full name or business name.
        - :description: (str) An arbitrary string that you can attach to a customer object
        - :email: (dict) Customer's email address 
        - :address: (dict) The customer's address.
        - :shipping: (str) The customer's shipping information
        - :balance: (int)  An integer amount in cents that represents the customer's current balance
        - :phone: (str) The customer's phone number.
    :return: Details about the updated customer
    :rtype: dict
    :Examples:
    >>> params = {
                    "customer_id":"",
                    "name":"marie",
                    "description":"neww customerr", 
                    "email":"sample@mail.com", 
                    "address" : { 
                            "city":"",
                            "country":"",
                            "line1":"",
                            "postal_code":"",
                            "state":""  
                        },
                        "shipping":{     
                            "address" : { 
                                    "city":"",
                                    "country":"",
                                    "line1":"",
                                    "postal_code":"",
                                    "state":""
                            },
                            "name":"", 
                            "phone":"",   },   }


    """
    try:
        creds = json.loads(cred)
        required_params = ['customer_id']
        if all(param in params for param in required_params) and "apiKey" in creds:
            api_key = creds["apiKey"]
            customer_param = {}
            key_to_skip = ['customer_id']
            for key, value in params.items():
                if key in key_to_skip:
                    continue
                if value:
                    customer_param[key] = value
            stripe.api_key = api_key
            id = params['customer_id']
            customer = stripe.Customer.modify(
                id,
                **customer_param,
            )
            result = json.loads(json.dumps(customer, default=str))
            return result
        else:
            raise Exception("Missing input data")
    except Exception as e:
        return {"Error": str(e)}


def stripe_get_customer(cred,params,**kwargs):
    """
     Returns a customer object  with its details

    :param str apiKey: Used for authentication purposes. 
    :param dict params: contains the id of the customer to be retrieved.

        - :customer_id: (str,REQUIRED) the id of the customer to be retrieved
    :return: Details about the retrieved customer
    :rtype: dict
    """
    try:
        creds = json.loads(cred)
        if 'customer_id' in params and "apiKey" in creds:
            api_key = creds["apiKey"]
            id = params['customer_id']
            stripe.api_key = api_key
            customer = stripe.Customer.retrieve(id)
            result = json.loads(json.dumps(customer, default=str))
            return result
        else:
            raise Exception("Missing input data")
    except Exception as e:
        return {"Error": str(e)}


def stripe_delete_customer(cred,params,**kwargs):
    """
     Deletes a customer object  with its details

    :param str apiKey: Used for authentication purposes. 
    :param dict params: contains the id of the customer to be deleted.

        - :customer_id: (str,REQUIRED) the id of the customer to be deleted
    :return: Details about the deleted customer
    :rtype: dict
    """
    try:
        creds = json.loads(cred)
        if 'customer_id' in params and "apiKey" in creds:
            api_key = creds["apiKey"]
            id = params['customer_id']
            stripe.api_key = api_key
            customer = stripe.Customer.delete(id)
            result = json.loads(json.dumps(customer, default=str))
            return result
        else:
            raise Exception("Missing input data")
    except Exception as e:
        return {"Error": str(e)}


def stripe_get_many_customers(cred,params,**kwargs):
    """
        Returns a list of customer objects with specific properties if added

        :param str apiKey: Used for authentication purposes. 
        :param dict params: contains the details of the customers to be retrieved.

            - :email: (str) a specific email of the customers
            - :limit: (str) can range between 1 and 100, and the default is 10.
        :return: Details about the retrieved customers
        :rtype: dict
    """
    try:
        creds = json.loads(cred)
        if "apiKey" in creds:
            api_key = creds["apiKey"]
            customers = {}
            for key, value in params.items():
                customers[key] = value
            stripe.api_key = api_key
            response = stripe.Customer.list(**customers)
            result = json.loads(json.dumps(response, default=str))
            return result
        else:
            raise Exception("Missing input data")
    except Exception as e:
        return {"Error": str(e)}




def stripe_create_coupon(cred,params,**kwargs):
    """
     Creates a coupon object  with custom properties if added.

    :param str apiKey: Used for authentication purposes. 
    :param dict params: contains properties to be added to the created coupon

        - :percent_off: (str, REQUIRED) A positive float larger than 0, and smaller or equal to 100, that represents the discount the coupon will apply (required if amount_off is not passed).
        - :currency: (str) Three-letter ISO currency code, in lowercase

    :return: Details about the created coupon
    :rtype: dict

    """
    try:
        creds = json.loads(cred)
        required_params = ['percent_off']
        if all(param in params for param in required_params) and "apiKey" in creds:
            api_key = creds["apiKey"]
            coupon_param = {}
            for key, value in params.items():
                if value:
                    coupon_param[key] = value
            stripe.api_key = api_key
            coupon = stripe.Coupon.create(
                **coupon_param
            )
            result = json.loads(json.dumps(coupon, default=str))
            return result
        else:
            raise Exception("Missing input data")
    except Exception as e:
        return {"Error": str(e)}


def stripe_get_many_coupons(cred,params,**kwargs):
    """
        Returns a list of coupon objects with specific properties if added

        :param str apiKey: Used for authentication purposes. 
        :param dict params: contains the details of the coupons to be retrieved.


            - :limit: (str) can range between 1 and 100, and the default is 10.
        :return: Details about the retrieved coupons
        :rtype: dict
    """
    try:
        creds = json.loads(cred)
        if "apiKey" in creds:
            api_key = creds["apiKey"]
            coupons = {}
            for key, value in params.items():
                coupons[key] = value
            stripe.api_key = api_key
            response = stripe.Coupon.list(**coupons)
            result = json.loads(json.dumps(response, default=str))
            return result
        else:
            raise Exception("Missing input data")
    except Exception as e:
        return {"Error": str(e)}

operations = {
    "Get Balance":stripe_get_balance,
    "Create PaymentIntent":stripe_create_paymentintent,
    "Update PaymentIntent":stripe_update_paymentintent,
    "Get PaymentIntent":stripe_get_paymentintent,
    "Cancel PaymentIntent":stripe_cancel_paymentintent,
    "Get Many PaymentIntents":stripe_get_many_paymentintents,
    "Create Coupon":stripe_create_coupon,
    "Get Many Coupons":stripe_get_many_coupons,
    "Create Customer":stripe_create_customer,
    "Get Customer":stripe_get_customer,
    "Update Customer":stripe_update_customer,
    "Delete Customer":stripe_delete_customer,
    "Get Many Customers":stripe_get_many_customers,
}

